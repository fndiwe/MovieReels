import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {previewFetch, personalitySearch, episodesFetch} from './FetchFullData';
import {styles, MovieStyles} from './styles';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const IMAGE_URI = 'https://image.tmdb.org/t/p/w500';
const IMAGE_URI2 = 'https://image.tmdb.org/t/p/original';
import {UIActivityIndicator} from 'react-native-indicators';
const ImageCarousel = props => {
  const navigation = useNavigation();
  const isUpcoming = props.isUpcoming;
  const [entries, setEntries] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const carouselRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const category = props.category;
  const pData = props.data2;
  const image = props.image;
  const title = props.title;
  const preview = props.preview;

  const [currentWatchlist, setCurrentWatchlist] = useState([]);
  const id = props.id;
  const type = props.type;
  useEffect(() => {
    if (loading && !preview) {
      props.data
        .then(data => {
          if (data != null) {
            setLoading(false);
            setEntries(data); // set loading to false, when data is loaded
          } else {
            ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
          }
        })
        .catch(function (error) {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        });
    }
  }, [loading]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Watchlist');
      if (value !== null) {
        setCurrentWatchlist(JSON.parse(value));
      }
    } catch (e) {
      console.log('error get');
    }
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );
  function handleClick(props) {
    setLoading2(true);
    if (category !== 'cast' && category !== 'seasons') {
      previewFetch({id: props.id, type: type})
        .then(data => {
          if (data != null) {
            setLoading(false);
            if (data.videos.results[0].key) {
              var added = false;
              currentWatchlist.forEach(element => {
                if (type === 'movie' && data.title === element.title) {
                  added = true;
                } else if (type === 'tv' && data.name === element.name) {
                  added = true;
                }
              });
              navigation.navigate('Preview', {
                data: data,
                type: type,
                added: added,
              });
              setLoading2(false);
            } else {
              ToastAndroid.show(
                'No valid data gotten for this item at the moment',
                ToastAndroid.LONG,
              );
              setLoading2(false);
            }
          } else {
            ToastAndroid.show('Network Error', ToastAndroid.SHORT);
            setLoading2(false);
          }
        })
        .catch(function (error) {
          if (error.msg === 'Network Error') {
            ToastAndroid.show(error.msg, ToastAndroid.SHORT);
            setLoading2(false);
          }
          ToastAndroid.show(
            'No valid data gotten for this item at the moment',
            ToastAndroid.SHORT,
          );
          setLoading2(false);
        });
    } else if (category === 'seasons') {
      episodesFetch({id: id, season: props.season})
        .then(data => {
          if (data != null) {
            setLoading(false);
            navigation.navigate('Episodes', {
              data: data,
              type: type,
              season: props.season,
              id: id,
              image: image,
              title: title,
            });
            setLoading2(false);
          } else {
            ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
            setLoading2(false);
          }
        })
        .catch(function (error) {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
          setLoading2(false);
        });
    } else {
      personalitySearch({id: props.id})
        .then(data => {
          if (data != null) {
            setLoading(false);
            if (data.birthday === null || data.biography === '') {
              ToastAndroid.show(
                'No valid information found for ' + data.name,
                ToastAndroid.SHORT,
              );
              setLoading2(false);
            } else {
              navigation.navigate('Profile', {
                data: data,
              });
              setLoading2(false);
            }
          } else {
            ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
            setLoading2(false);
          }
        })
        .catch(function (error) {
          ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
          console.log('Problem with fetching data ' + error.message);
          setLoading2(false);
        });
    }
  }
  const width = screenWidth * 0.31;
  const height = isUpcoming
    ? screenHeight * 0.25
    : category === 'seasons'
    ? screenHeight * 0.24
    : screenHeight * 0.23;
  const margin = category !== 'cast' ? height * 0.09 : height * 0.5;

  const RenderItem = ({item}) => {
    return (
      <>
        {loading && !preview ? (
          <UIActivityIndicator
            hidesWhenStopped={true}
            size={screenHeight * 0.07}
            color="white"
            animating={loading}
          />
        ) : (
          item.poster_path && (
            <TouchableOpacity
              onPress={() =>
                handleClick({id: item.id, season: item.season_number})
              }
              activeOpacity={0.9}
              style={{
                width: width,
                height: height,
                marginBottom: margin,
                marginLeft: screenWidth * 0.025,
                marginRight: screenWidth * 0.003,
              }}>
              {!isUpcoming && (
                <FastImage
                  defaultSource={require('../assets/images/fallback.png')}
                  source={{uri: IMAGE_URI + item.poster_path}}
                  style={styles.image2}
                />
              )}
              {isUpcoming && (
                <>
                  <FastImage
                    source={{uri: IMAGE_URI2 + item.backdrop_path}}
                    defaultSource={require('../assets/images/fallback.png')}
                    style={styles.image}
                  />
                  <Text
                    numberOfLines={1}
                    style={[styles.text, {width: screenWidth * 0.93}]}>
                    {type === 'movie' ? item.title : item.name}
                  </Text>
                </>
              )}
              {category === 'seasons' && (
                <Text style={styles.text} numberOfLines={2}>
                  Season {item.season_number.toString()}
                </Text>
              )}
            </TouchableOpacity>
          )
        )}

        {loading && !preview ? (
          <UIActivityIndicator
            hidesWhenStopped={true}
            size={screenHeight * 0.07}
            color="white"
            animating={loading}
          />
        ) : (
          category === 'cast' &&
          !isUpcoming &&
          item.profile_path && (
            <TouchableOpacity
              onPress={() => handleClick({id: item.id})}
              activeOpacity={0.9}
              style={{
                width: width,
                height: height,
                marginBottom: margin,
                marginLeft: screenWidth * 0.015,
                marginRight: screenWidth * 0.01,
              }}>
              <FastImage
                defaultSource={require('../assets/images/fallback.png')}
                source={{uri: IMAGE_URI + item.profile_path}}
                style={styles.image2}
              />
              {category === 'cast' && (
                <Text style={styles.text} numberOfLines={2}>
                  {item.name}
                </Text>
              )}
              {category === 'cast' && (
                <Text
                  style={[
                    styles.text,
                    {
                      fontFamily: 'space_mono_regular',
                      fontSize: screenHeight * 0.021,
                    },
                  ]}
                  numberOfLines={2}>
                  as {item.character}
                </Text>
              )}
            </TouchableOpacity>
          )
        )}
      </>
    );
  };
  return (
    <View style={MovieStyles.container}>
      {loading2 && (
        <UIActivityIndicator
          hidesWhenStopped={true}
          size={screenWidth * 0.07}
          color="white"
          animating={loading2}
        />
      )}
      {isUpcoming ? (
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth}
          data={entries}
          autoplay
          loop
          autoplayInterval={10000}
          keyExtractor={item => item.id}
          renderItem={({item}) => <RenderItem item={item} />}
          inactiveSlideOpacity={0.4}
        />
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={item => item.id}
          data={preview ? pData : entries}
          renderItem={({item}) => <RenderItem item={item} />}
        />
      )}
    </View>
  );
};

export default ImageCarousel;
