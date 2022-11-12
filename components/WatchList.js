import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {MovieStyles, PreviewStyles, styles} from './styles';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {width, height} = Dimensions.get('window');
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import {
  RewardedInterstitialAd,
  RewardedAdEventType,
  TestIds,
  useInterstitialAd,
} from 'react-native-google-mobile-ads';
const RewardedadUnitId = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : 'ca-app-pub-6558254583092184/1127599125';
const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
  RewardedadUnitId,
  {
    requestNonPersonalizedAdsOnly: false,
  },
);

const InterstitialadUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-6558254583092184/4798863788';

export default function WatchList({navigation, route}) {
  const [recent, setRecent] = useState([]);
  const [showText, setShowText] = useState(true);
  const IMAGE_URI = 'https://image.tmdb.org/t/p/w500';
  const [currentWatchlist, setCurrentWatchlist] = useState([]);
  var type = null;
  var id = null;
  var season = null;
  var episode = null;
  var category = 'watchlist';
  const [loaded, setLoaded] = useState(false);
  const carouselRef = useRef(null);

  const {isLoaded, isClosed, load, show} = useInterstitialAd(
    InterstitialadUnitId,
    {
      requestNonPersonalizedAdsOnly: false,
    },
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      if (type === 'tv' && type && id && season && episode) {
        navigation.navigate('Player', {
          type: type,
          id: id,
          season: season,
          episode: episode,
          category: category,
        });
      } else if (type !== 'tv' && type && id) {
        navigation.navigate('Player', {
          type: type,
          id: id,
          category: category,
        });
      }
    }
  }, [isClosed]);

  useFocusEffect(
    useCallback(() => {
      getRecent();
      getData();
    }, []),
  );
  useEffect(() => {
    setTimeout(() => {
      setShowText(false);
    }, 3000);
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
        if (type === 'tv' && type && id && season && episode) {
          navigation.navigate('Player', {
            type: type,
            id: id,
            season: season,
            episode: episode,
            category: category,
          });
        } else if (type !== 'tv' && type && id) {
          navigation.navigate('Player', {
            type: type,
            id: id,
            category: category,
          });
        }
      },
    );
    //   // Start loading the rewarded interstitial ad straight away
    rewardedInterstitial.load();
    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  const handleClick = props => {
    navigation.navigate('Preview', {
      data: props.data,
      type: props.type,
      added: true,
    });
  };
  const handleWatch = props => {
    if (props.type === 'tv') {
      type = props.type;
      id = props.id;
      season = props.season;
      episode = props.episode;
      category = category;
    } else {
      type = props.type;
      id = props.id;
      category = category;
    }
    try {
      rewardedInterstitial.show();
    } catch (error) {
      if (isLoaded) {
        show();
      } else {
        if (type === 'tv' && type && id && season && episode) {
          navigation.navigate('Player', {
            type: type,
            id: id,
            season: season,
            episode: episode,
            category: category,
          });
        } else if (type !== 'tv' && type && id) {
          navigation.navigate('Player', {
            type: type,
            id: id,
            category: category,
          });
        }
      }
    }
  };
  const handleRemove = index => {
    Alert.alert(
      null,
      'Are you sure you want to remove this item from "Recent Watching" ?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            recent.splice(index);
            storeData(recent);
            getRecent();
          },
        },
      ],
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <>
        {item.name ? (
          <TouchableOpacity
            onPress={() => handleClick({data: item, type: 'tv'})}
            activeOpacity={0.6}
            style={styles.image2}>
            <FastImage
              source={{uri: IMAGE_URI + item.poster_path}}
              style={styles.image2}
              defaultSource={require('../assets/images/fallback.png')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleClick({data: item, type: 'movie'})}
            activeOpacity={0.6}
            style={styles.image2}>
            <FastImage
              source={{uri: IMAGE_URI + item.poster_path}}
              style={styles.image2}
              defaultSource={require('../assets/images/fallback.png')}
            />
          </TouchableOpacity>
        )}
      </>
    );
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Watchlist');
      if (value !== null) {
        console.log('object :>> ', JSON.parse(value));
        setCurrentWatchlist(JSON.parse(value));
      }
    } catch (e) {
      console.log('error get');
    }
  };
  const getRecent = async () => {
    try {
      const value = await AsyncStorage.getItem('Recent');
      console.log('recent :>> ', JSON.parse(value));
      if (value !== null) {
        setRecent(JSON.parse(value));
      }
    } catch (e) {
      console.log('error get');
    }
  };
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('Recent', JSON.stringify(value));
    } catch (e) {
      console.log('error');
    }
  };

  const renderItem1 = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: width,
          height: height * 0.25,
          marginLeft: width * 0.025,
          marginRight: width * 0.003,
        }}
        onPress={() => {
          item.type === 'tv'
            ? handleWatch({
                type: item.type,
                id: item.id,
                season: item.season,
                episode: item.episode,
              })
            : handleWatch({type: item.type, id: item.id});
        }}
        activeOpacity={0.6}
        onLongPress={() => handleRemove(index)}>
        <FastImage
          source={{uri: item.image}}
          defaultSource={require('../assets/images/fallback.png')}
          style={styles.image}
        />
        <Icon
          style={{
            left: width * 0.8,
            top: height * 0.17,
            position: 'absolute',
          }}
          color="white"
          size={height * 0.08}
          name="play-arrow"
        />
        <Text numberOfLines={2} style={[styles.text, {width: width * 0.93}]}>
          {item.type === 'movie'
            ? item.title
            : item.title + ' - Se ' + item.season + ' Ep ' + item.episode}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={MovieStyles.container}>
      <FastImage
        style={PreviewStyles.logo}
        source={require('../assets/images/logo.png')}
      />
      <View>
        <Text style={[MovieStyles.text, {marginTop: height * 0.03}]}>
          Recently Watching
        </Text>
        {showText && (
          <Text style={[PreviewStyles.genreText, {color: 'red'}]}>
            Long press on movie to remove from "Recent Watching"
          </Text>
        )}
        {!showText && (
          <Text style={PreviewStyles.genreText}>
            {recent.length} {recent.length === 1 ? 'item' : 'items'} found
          </Text>
        )}
        <Carousel
          ref={carouselRef}
          sliderWidth={width}
          sliderHeight={width}
          itemWidth={width}
          data={recent}
          autoplay
          loop
          keyExtractor={item => item.id}
          autoplayInterval={10000}
          renderItem={renderItem1}
          inactiveSlideOpacity={0.4}
        />
      </View>
      <Text style={[MovieStyles.text, {marginTop: height * 0.03}]}>
        Watchlist
      </Text>
      {!showText && (
        <Text style={PreviewStyles.genreText}>
          {currentWatchlist.length}{' '}
          {currentWatchlist.length === 1 ? 'item' : 'items'} found
        </Text>
      )}
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-around'}}
        showsVerticalScrollIndicator={false}
        data={currentWatchlist}
        inverted
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={3}
      />
    </View>
  );
}
