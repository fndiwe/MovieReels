import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {MovieStyles, styles, PreviewStyles, ListStyles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  previewFetch,
  search,
  personalitySearch,
  kidsFetch,
  genreFetch,
  fetchData,
  fetchNewMovies,
  fetchTvData,
  fetchTrendingData,
  companiesFetch,
} from './FetchFullData';
import {useFocusEffect} from '@react-navigation/native';
import {UIActivityIndicator} from 'react-native-indicators';
import {useNavigation} from '@react-navigation/native';
import DownView from './DownView';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
export const List = props => {
  const navigation = useNavigation();
  const IMAGE_URI = 'https://image.tmdb.org/t/p/w500';
  const IMAGE_URI2 = 'https://image.tmdb.org/t/p/original';
  const [loading, setLoading] = useState(true);
  const [flatList, setFlatList] = useState([]);
  const flatObj = props.data;
  const episodes = props.episodes;
  const [loading2, setLoading2] = useState(false);
  const [obj, setObj] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [showEpisodeDetails, setShowEpisodeDetails] = useState(false);
  useEffect(() => {
    if (
      loading &&
      !isFinished &&
      category !== 'personality' &&
      category !== 'episodes'
    ) {
      if (category === 'trending') {
        fetchTrendingData({category: category, type: type, page: page})
          .then(data => {
            if (data != null) {
              setLoading(false);
              setFlatList(flatList.concat(data));
            } else {
              ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
              setLoading(false);
            }
          })
          .catch(function (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            setLoading(false);
          });
      } else if (
        (type === 'tv' && category === 'on_the_air') ||
        category === 'airing_today'
      ) {
        fetchTvData({category: category, page: page})
          .then(data => {
            if (data != null) {
              setLoading(false);
              setFlatList(flatList.concat(data)); // set loading to false, when data is loaded
            } else {
              ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
              setLoading(false);
            }
          })
          .catch(function (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
          });
      } else if (category === 'new_movies') {
        fetchNewMovies({type: type, page: page})
          .then(data => {
            if (data != null) {
              setLoading(false);
              setFlatList(flatList.concat(data)); // set loading to false, when data is loaded
            } else {
              ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
              setLoading(false);
            }
          })
          .catch(function (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            setLoading(false);
          });
      } else if (category === 'companies') {
        companiesFetch({type: type, id: props.id, page: page})
          .then(data => {
            if (data != null) {
              setLoading(false);
              setFlatList(flatList.concat(data)); // set loading to false, when data is loaded
            } else {
              ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
              setLoading(false);
            }
          })
          .catch(function (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            setLoading(false);
          });
      } else if (category === 'kids') {
        kidsFetch({type: type, page: page})
          .then(data => {
            if (data != null) {
              setLoading(false);
              setFlatList(flatList.concat(data)); // set loading to false, when data is loaded
            } else {
              ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
              setLoading(false);
            }
          })
          .catch(function (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            setLoading(false);
          });
      } else if (category === 'genre') {
        genreFetch({type: type, page: page, genre_id: genre_id})
          .then(data => {
            if (data != null) {
              setLoading(false);
              setFlatList(flatList.concat(data)); // set loading to false, when data is loaded
            } else {
              ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
              setLoading(false);
            }
          })
          .catch(function (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            setLoading(false);
          });
      } else if (category === 'search') {
        search({type: type, query: query})
          .then(data => {
            if (data != null) {
              setLoading(false);
              if (data.length < 20) {
                setIsFinished(true);
                setLoading(false);
              }
              setFlatList(flatList.concat(data)); // set loading to false, when data is loaded
            } else if (data.length === 0) {
              ToastAndroid.show('No results found', ToastAndroid.LONG);
            } else {
              ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
              setLoading(false);
            }
          })
          .catch(function (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            setLoading(false);
          });
      } else if (category === 'personSearch') {
        search({type: type, query: query, page: page})
          .then(data => {
            if (data != null) {
              setLoading(false);
              setFlatList(flatList.concat(data)); // set loading to false, when data is loaded
            } else if (data.length === 0) {
              ToastAndroid.show('No results found', ToastAndroid.LONG);
            } else {
              ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
              setLoading(false);
            }
          })
          .catch(function (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            setLoading(false);
          });
      } else {
        fetchData({category: category, type: type, page: page})
          .then(data => {
            if (data != null) {
              setLoading(false);
              setFlatList(flatList.concat(data)); // set loading to false, when data is loaded
            } else {
              ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
              setLoading(false);
            }
          })
          .catch(function (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            setLoading(false);
          });
      }
    }
  }, [loading]);
  const category = props.category;
  const title = props.categoryTitle;
  const type = props.type;
  const title1 = props.title;
  const query = props.query;
  const season = props.season;
  const genre_id = props.genre_id;
  const id = props.id;
  const [page, setPage] = useState(1);
  const [currentWatchlist, setCurrentWatchlist] = useState([]);
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
  const handleClick = props => {
    setLoading2(true);
    if (category === 'personSearch') {
      personalitySearch({id: props.id})
        .then(data => {
          if (data != null) {
            setLoading2(false);
            if (data.birthday === null || data.biography === '') {
              ToastAndroid.show(
                'No valid information found for ' + data.name,
                ToastAndroid.SHORT,
              );
            } else {
              navigation.navigate('Profile', {
                data: data,
                comingFrom: true,
                category: category,
                type: type,
                title: title1,
              });
            }
          } else {
            ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
          }
        })
        .catch(function (error) {
          ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
          console.log('Problem with fetching data ' + error.message);
        });
    } else {
      previewFetch({id: props.id, type: props.type})
        .then(data => {
          if (data != null) {
            setLoading2(false);
            if (data.videos.results[0].key) {
              var added = false;
              currentWatchlist.forEach(element => {
                if (type === 'movie' && data.title === element.title) {
                  added = true;
                } else if (type === 'tv' && data.name === element.name) {
                  added = true;
                }
              });
              category !== 'search'
                ? navigation.navigate('Preview', {
                    data: data,
                    type: props.type,
                    added: added,
                  })
                : navigation.navigate('Preview', {
                    data: data,
                    type: props.type,
                    added: added,
                    comingFrom: true,
                    category: category,
                    title: title1,
                  });
            } else {
              ToastAndroid.show(
                'No valid data gotten for this movie at this moment',
                ToastAndroid.LONG,
              );
              setLoading2(false);
            }
          } else {
            ToastAndroid.show('Error loading data..', ToastAndroid.SHORT);
            setLoading2(false);
          }
        })
        .catch(function (error) {
          console.log('error :>> ', error);
          ToastAndroid.show(
            'No valid data gotten for this movie at this moment',
            ToastAndroid.SHORT,
          );
          setLoading2(false);
        });
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        {item.poster_path && (
          <TouchableOpacity
            onPress={() =>
              handleClick({id: item.id, type: item.title ? 'movie' : 'tv'})
            }
            activeOpacity={0.9}
            style={[ListStyles.item, {marginBottom: screenHeight * 0.015}]}>
            {category !== 'personSearch' && (
              <FastImage
                source={{uri: IMAGE_URI + item.poster_path}}
                style={ListStyles.image}
                defaultSource={require('../assets/images/fallback.png')}
              />
            )}
          </TouchableOpacity>
        )}
        {category === 'episodes' && (
          <TouchableOpacity
            onPress={() => {
              setShowEpisodeDetails(false);
              setObj(item);
              setShowEpisodeDetails(true);
            }}
            activeOpacity={0.9}
            style={{
              marginBottom: screenHeight * 0.025,
            }}>
            <FastImage
              source={{uri: IMAGE_URI + item.still_path}}
              style={[ListStyles.image, {height: screenHeight * 0.11}]}
              defaultSource={require('../assets/images/fallback.png')}
            />
            <Text style={styles.text} numberOfLines={1}>
              Episode {item.episode_number.toString()}
            </Text>
          </TouchableOpacity>
        )}

        {/* {category === 'personSearch' && item.profile_path && (
            <TouchableOpacity
              onPress={() => handleClick({id: item.id})}
              activeOpacity={0.9}
              style={[ListStyles.item, {marginBottom: screenHeight * 0.068}]}>
              <FastImage
                source={{uri: IMAGE_URI + item.profile_path}}
                style={ListStyles.image}
                defaultSource={require('../assets/images/fallback.png')}
              />
              <Text style={styles.text} numberOfLines={2}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )} */}
      </>
    );
  };
  const Header = () => {
    return (
      <>
        {category === 'personality' && (
          <>
            <FastImage
              source={{uri: IMAGE_URI + flatObj.profile_path}}
              style={[ListStyles.image, {marginLeft: screenWidth * 0.025}]}
              defaultSource={require('../assets/images/fallback.png')}
            />
            {flatObj.also_known_as && (
              <Text
                style={[
                  styles.text,
                  {
                    padding: screenWidth * 0.025,
                    fontSize: screenHeight * 0.02,
                  },
                ]}>
                Also Known as -{'>'}{' '}
                <Text
                  style={[
                    styles.text,
                    {
                      fontFamily: 'space_mono_regular',
                      fontSize: screenHeight * 0.02,
                    },
                  ]}>
                  {flatObj.also_known_as[0]}
                </Text>
              </Text>
            )}
            <Text
              style={[
                styles.text,
                {
                  padding: screenWidth * 0.025,
                  fontSize: screenHeight * 0.02,
                },
              ]}>
              Age -{'>'}{' '}
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: 'space_mono_regular',
                    fontSize: screenHeight * 0.02,
                  },
                ]}>
                {new Date().getFullYear() -
                  Number(flatObj.birthday.substring(0, 4))}{' '}
                years
              </Text>
            </Text>
            <Text
              style={[
                styles.text,
                {
                  padding: screenWidth * 0.025,
                  fontSize: screenHeight * 0.02,
                },
              ]}>
              Hometown -{'>'}{' '}
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: 'space_mono_regular',
                    fontSize: screenHeight * 0.02,
                  },
                ]}>
                {flatObj.place_of_birth}
              </Text>
            </Text>
            <Text
              style={[
                styles.text,
                {
                  padding: screenWidth * 0.025,
                  textAlign: 'center',
                  fontSize: screenHeight * 0.02,
                },
              ]}>
              Biography
            </Text>
            <Text style={PreviewStyles.synopsis}>{flatObj.biography}</Text>
            <Text
              style={[
                styles.text,
                {
                  padding: screenWidth * 0.025,
                  fontSize: screenHeight * 0.02,
                },
              ]}>
              Number of Movies acted -{'>'}{' '}
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: 'space_mono_regular',
                    fontSize: screenHeight * 0.02,
                  },
                ]}>
                {flatObj.movie_credits.cast.length}
              </Text>
            </Text>
            <Text
              style={[
                styles.text,
                {
                  padding: screenWidth * 0.025,
                  textAlign: 'center',
                  fontSize: screenHeight * 0.02,
                },
              ]}>
              Movies Acted
            </Text>
          </>
        )}
      </>
    );
  };
  return (
    <View style={MovieStyles.container}>
      <Text style={[MovieStyles.text, {marginBottom: screenHeight * 0.015}]}>
        {category === 'personality' && flatObj !== {} ? flatObj.name : title}
      </Text>

      {loading2 && (
        <UIActivityIndicator
          hidesWhenStopped={true}
          size={screenHeight * 0.04}
          color="white"
          animating={loading2}
        />
      )}
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-around'}}
        ListHeaderComponent={Header}
        showsVerticalScrollIndicator={false}
        data={
          category === 'personality'
            ? flatObj.movie_credits.cast
            : category === 'episodes'
            ? episodes
            : flatList
        }
        keyExtractor={item => item.id}
        renderItem={renderItem}
        initialNumToRender={10}
        numColumns={3}
        onEndReached={() => {
          setPage(page + 1);
          setLoading(true);
        }}
      />
      {loading && category !== 'personality' && category !== 'episodes' && (
        <UIActivityIndicator
          hidesWhenStopped={true}
          size={screenHeight * 0.04}
          color="white"
          animating={loading && !isFinished}
        />
      )}
      {category === 'episodes' && showEpisodeDetails && (
        <>
          <TouchableOpacity style={ListStyles.close}>
            <Icon
              onPress={() => setShowEpisodeDetails(false)}
              style={{padding: 3}}
              name="close"
              color="white"
              size={screenHeight * 0.045}
            />
          </TouchableOpacity>
          <DownView
            episode={obj.episode_number}
            season={season}
            id={id}
            date={obj.air_date}
            runtime={obj.runtime}
            rating={obj.vote_average.toFixed(1)}
            overview={obj.overview}
            title={obj.name}
            image={IMAGE_URI + obj.still_path}
            image1={props.image}
            title1={props.title}
          />
        </>
      )}
    </View>
  );
};
