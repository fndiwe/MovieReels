import React, {useState, useRef, useEffect} from 'react';
import {
  Platform,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  BackHandler,
  ToastAndroid,
  StatusBar,
  ImageBackground,
  AppState,
} from 'react-native';
import {MovieStyles} from './styles';
import ImageCarousel from './Carousel';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
import {UIActivityIndicator} from 'react-native-indicators';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {width, height} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import YoutubePlayer from 'react-native-youtube-iframe';
import {PreviewStyles, styles} from './styles';
import FastImage from 'react-native-fast-image';
import {
  RewardedInterstitialAd,
  RewardedAdEventType,
  TestIds,
  useInterstitialAd,
} from 'react-native-google-mobile-ads';
const IMAGE_URI = 'https://image.tmdb.org/t/p/w500';
const IMAGE_URI2 = 'https://image.tmdb.org/t/p/original';
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

export default function Preview({navigation, route}) {
  const [loaded, setLoaded] = useState(false);
  const [currentWatchlist, setCurrentWatchlist] = useState([]);
  const previewData = route.params.data;
  const type = route.params.type;
  const [added, setAdded] = useState(route.params.added);
  const APP_URL =
    'https://play.google.com/store/apps/details?id=com.franklinndiwe.moviereels';
  const [color, setColor] = useState('transparent');
  const [loading, setLoading] = useState(false);
  const [showTrailerButton, setShowTrailerButton] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isMovie, setIsMovie] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('Watchlist', JSON.stringify(value));
    } catch (e) {
      console.log('error');
    }
  };
  const shortOverview = previewData.overview;
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
  const {isLoaded, isClosed, load, show} = useInterstitialAd(
    InterstitialadUnitId,
    {
      requestNonPersonalizedAdsOnly: false,
    },
  );
  function handleBackButtonClick() {
    {
      !route.params.comingFrom
        ? navigation.goBack()
        : navigation.navigate('Search', {
            category: route.params.category,
            title: route.params.title,
            type: route.params.type,
          });
    }
    return true;
  }

  useEffect(() => {
    getData();
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed && !isMovie) {
      setShowTrailer(true);
    } else if (isClosed && isMovie) {
      navigation.navigate('Player', {
        type: type,
        id: previewData.id,
        image: IMAGE_URI + previewData.backdrop_path,
        title: previewData.title,
        category: 'notwatchlist',
      });
    }
  }, [isClosed]);
  useEffect(() => {
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
        navigation.navigate('Player', {
          type: type,
          id: previewData.id,
          image: IMAGE_URI + previewData.backdrop_path,
          title: previewData.title,
          category: 'notwatchlist',
        });
      },
    );

    // Start loading the rewarded interstitial ad straight away
    rewardedInterstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  function handlePress() {
    if (!added) {
      currentWatchlist.push(previewData);
      storeData(currentWatchlist);
      setColor('#5b310a');
      setTimeout(() => {
        setColor('transparent');
        setAdded(true);
      }, 0.5);
    } else {
      const data = currentWatchlist.filter(
        item => item.title !== previewData.title,
      );
      setCurrentWatchlist(data);
      storeData(data);
      setAdded(false);
    }
  }

  function handleStream(props) {
    if (props.id && type === 'movie') {
      setIsMovie(true);
      setLoading(true);
      setShowTrailerButton(false);
      setLoading(false);
      try {
        rewardedInterstitial.show();
      } catch (error) {
        if (isLoaded) {
          show();
        } else {
          navigation.navigate('Player', {
            type: type,
            id: props.id,
            image: IMAGE_URI + previewData.backdrop_path,
            title: previewData.title,
            category: 'notwatchlist',
          });
        }
      }
    } else if (type === 'tv') {
      setShowTrailerButton(false);
      Alert.alert(
        'Select season?',
        'Please scroll down to select the season you want to stream🎬',
      );
    } else {
      ToastAndroid.show('Error loading Movie..', ToastAndroid.LONG);
      setLoading(false);
    }
  }
  function handleTrailer() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isLoaded) {
        show();
      } else {
        setShowTrailer(true);
      }
      setShowTrailerButton(false);
    }, 1000);
  }
  const handleShare = async () => {
    const shareOptions = {
      title: type === 'movie' ? previewData.title : previewData.name,
      message: `${shortOverview}\nDownload Movie Reels to watch ${
        type === 'movie' ? previewData.title : previewData.name
      } and up to 5million+ exciting Movies and TV series.`,
      url: APP_URL,
    };
    await Share.open(shareOptions);
  };

  const runtime =
    type === 'movie' ? previewData.runtime : previewData.episode_run_time[0];
  const runtimeHour = Math.floor(runtime / 60).toString();
  const runtimeMin = Math.floor(runtime - Number(runtimeHour) * 60).toString();
  return (
    <View style={MovieStyles.container}>
      <StatusBar
        hidden
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          resizeMode="cover"
          style={PreviewStyles.image}
          source={{uri: IMAGE_URI2 + previewData.backdrop_path}}>
          <TouchableOpacity style={PreviewStyles.back}>
            <Icon
              onPress={() => handleBackButtonClick()}
              color="white"
              name="arrow-back"
              size={height * 0.035}
              style={{padding: 3}}
            />
          </TouchableOpacity>

          <View style={{top: height * 0.44, position: 'absolute', zIndex: 1}}>
            {type === 'movie' ? (
              <Text
                numberOfLines={2}
                style={[PreviewStyles.title, {color: 'white'}]}>
                {previewData.title}
              </Text>
            ) : (
              <>
                <Text
                  numberOfLines={2}
                  style={[PreviewStyles.title, {color: 'white'}]}>
                  {previewData.name}
                </Text>
              </>
            )}
          </View>

          <FastImage
            style={PreviewStyles.logo}
            source={require('../assets/images/logo.png')}
          />
          {!loading && showTrailerButton && (
            <TouchableOpacity
              onPress={() => handleStream({id: previewData.id, type: type})}
              activeOpacity={0.9}
              style={PreviewStyles.streamButton}>
              <Text style={[styles.text, {textAlign: 'center'}]}>
                {type === 'movie' ? ' Watch Full Movie ' : ' Watch TV Series '}
              </Text>
            </TouchableOpacity>
          )}
          <View style={PreviewStyles.genreView}>
            {previewData.genres.slice(0, 4).map(element => {
              return (
                <TouchableOpacity
                  key={element.id}
                  onPress={() =>
                    navigation.navigate('Genre', {
                      name:
                        type === 'movie'
                          ? element.name + ' Movies'
                          : element.name + ' TV Series',
                      id: element.id,
                      type: type,
                    })
                  }
                  activeOpacity={0.9}
                  style={PreviewStyles.genreButton}>
                  <Text key={element.id} style={PreviewStyles.genreText}>
                    {element.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {!loading && showTrailerButton && (
            <TouchableOpacity
              onPress={() => handleTrailer()}
              activeOpacity={0.9}
              style={PreviewStyles.streamButton1}>
              <Text
                style={[
                  styles.text,
                  {textAlign: 'center', color: 'black', marginTop: 0},
                ]}>
                Play Trailer
              </Text>
            </TouchableOpacity>
          )}
          {loading && (
            <UIActivityIndicator
              style={{
                position: 'absolute',
                zIndex: 3,
                top: height * 0.23,
                left: width * 0.45,
              }}
              size={height * 0.03}
              color="white"
              animating={loading}
            />
          )}

          <View style={PreviewStyles.downMenu}>
            {type === 'movie' ? (
              <Text
                style={[
                  PreviewStyles.text,
                  {
                    fontFamily: 'space_mono_regular',
                    marginTop: height * 0.005,
                  },
                ]}>
                {previewData.release_date.substring(0, 4)}
              </Text>
            ) : (
              <Text
                style={[
                  PreviewStyles.text,
                  {
                    fontFamily: 'space_mono_regular',
                    marginTop: height * 0.005,
                  },
                ]}>
                {' '}
                {previewData.first_air_date.substring(0, 4)}
              </Text>
            )}
            <Text style={{color: 'white', fontSize: height * 0.03}}>| </Text>
            {type !== 'tv' && (
              <>
                <Text
                  style={[
                    PreviewStyles.text,
                    {
                      fontFamily: 'space_mono_regular',
                      marginTop: height * 0.005,
                    },
                  ]}>
                  {Number(runtimeHour) !== 0 && runtimeHour}
                  {Number(runtimeHour) !== 0
                    ? Number(runtimeHour) === 1
                      ? 'hr '
                      : 'hrs '
                    : null}
                  {''}
                  {runtimeMin}
                  {Number(runtimeMin) === 1 ? 'min' : 'mins'}
                </Text>
                <Text style={{color: 'white', fontSize: height * 0.03}}>|</Text>
              </>
            )}
            <FastImage
              style={PreviewStyles.imdb}
              source={require('../assets/images/imdb.png')}
            />
            <Text
              style={[
                PreviewStyles.text,
                {
                  fontFamily: 'space_mono_regular',
                  marginTop: height * 0.005,
                },
              ]}>
              {' '}
              {Number(previewData.vote_average).toFixed(1)}
            </Text>
          </View>

          {previewData.videos.results[0].key && showTrailer && (
            <TouchableOpacity activeOpacity={0.9} style={PreviewStyles.close}>
              <Icon
                onPress={() => setShowTrailer(false)}
                size={height * 0.04}
                style={{padding: 3}}
                name="close"
                color="white"
              />
            </TouchableOpacity>
          )}
          {previewData.videos.results[0].key && showTrailer && (
            <View
              style={[
                PreviewStyles.trailer,
                {borderBottomRightRadius: 0, height: height * 0.4},
              ]}>
              <YoutubePlayer
                onChangeState={event => {
                  if (event === 'ended') {
                    setShowTrailer(false);
                  }
                }}
                forceAndroidAutoplay={true}
                play={appStateVisible === 'active' ? true : false}
                initialPlayerParams={{
                  showClosedCaptions: true,
                  modestbranding: true,
                  controls: false,
                  color: 'red',
                }}
                webViewProps={{
                  opacity: 0.99,
                  userAgent:
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
                  mediaPlaybackRequiresUserAction: false,
                }}
                height={height * 0.4}
                videoId={previewData.videos.results[0].key}
              />
            </View>
          )}
          <>
            {!showTrailer && (
              <TouchableOpacity
                activeOpacity={0.9}
                style={PreviewStyles.play}
                onPress={() => setShowTrailerButton(!showTrailerButton)}>
                <Icon
                  name="play-arrow"
                  size={height * 0.07}
                  color="white"
                  style={{padding: 2}}
                />
              </TouchableOpacity>
            )}
          </>

          {!added ? (
            <TouchableOpacity
              onPress={() => handlePress()}
              style={[PreviewStyles.addButton, {backgroundColor: color}]}
              activeOpacity={0.9}>
              <Text
                style={[
                  PreviewStyles.text,
                  {
                    textAlign: 'center',
                    fontFamily: 'godofwar',
                    fontSize: height * 0.018,
                    marginTop: height * 0.01,
                  },
                ]}>
                Add to Watchlist
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => handlePress()}
              style={[PreviewStyles.addButton, PreviewStyles.addButtonSmall]}
              activeOpacity={0.9}>
              <Icon name="bookmark" size={height * 0.025} color="white" />
            </TouchableOpacity>
          )}
          <Icon
            name="share"
            size={height * 0.042}
            color="white"
            onPress={() => handleShare()}
            style={PreviewStyles.share}
          />
          {!showTrailer && (
            <FastImage
              source={{uri: IMAGE_URI2 + previewData.backdrop_path}}
              style={[PreviewStyles.trailer, {zIndex: 1}]}
            />
          )}
          <LinearGradient
            style={PreviewStyles.gradient}
            colors={['#0c0c0c', '#0c0c0c']}
          />
        </ImageBackground>
        <Text style={[MovieStyles.text, PreviewStyles.text2]}>Synopsis</Text>
        <Text style={PreviewStyles.synopsis}>{previewData.overview}</Text>
        <Text style={[MovieStyles.text, PreviewStyles.text2]}>Cast</Text>
        <ImageCarousel
          preview={true}
          isUpcoming={false}
          type={route.params.type}
          id={route.params.id}
          data2={previewData.credits.cast}
          category="cast"
        />
        {type === 'tv' && (
          <>
            <Text style={[MovieStyles.text, PreviewStyles.text2]}>Seasons</Text>
            <ImageCarousel
              preview={true}
              isUpcoming={false}
              type="tv"
              id={previewData.id}
              data2={previewData.seasons}
              category="seasons"
              image={IMAGE_URI2 + previewData.backdrop_path}
              title={previewData.name}
            />
          </>
        )}

        <Text style={[MovieStyles.text, PreviewStyles.text2]}>Recommended</Text>
        <ImageCarousel
          preview={true}
          isUpcoming={false}
          type={route.params.type}
          id={route.params.id}
          data2={previewData.recommendations.results}
        />
      </ScrollView>
    </View>
  );
}
