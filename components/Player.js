import React, {useState, useRef, useEffect} from 'react';
import WebView from 'react-native-webview';
import {Dimensions, View, ToastAndroid, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Player({navigation, route}) {
  const browserRef = useRef();
  const [sync, setSync] = useState(false);
  const [showRefresh, setShowRefresh] = useState(false);
  const type = route.params.type;
  const id = route.params.id;
  const season = route.params.season;
  const episode = route.params.episode;
  const title = route.params.title;
  let object =
    type === 'tv'
      ? {
          id: id,
          type: type,
          episode: episode,
          season: season,
          title: title,
          image: route.params.image,
        }
      : {
          id: id,
          type: type,
          title: title,
          image: route.params.image,
        };

  const [recent, setRecent] = useState([]);
  const [source, setSource] = useState(
    type === 'tv'
      ? `https://database.gdriveplayer.us/player.php?type=series&tmdb=${id}&season=${season}&episode=${episode}`
      : `https://database.gdriveplayer.us/player.php?tmdb=${id}`,
  );
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('Recent', JSON.stringify(value));
    } catch (e) {
      console.log('error');
    }
  };
  const getRecent = async () => {
    try {
      const value = await AsyncStorage.getItem('Recent');
      if (value !== null) {
        // console.log("object :>> ", JSON.parse(value));
        setRecent(JSON.parse(value));
      }
    } catch (e) {
      console.log('error get');
    }
  };
  useEffect(() => {
    getRecent();
  }, []);
  const addToRecent = () => {
    recent.forEach(element => {
      if (
        route.params.category !== 'watchlist' &&
        type === 'movie' &&
        object.id !== element.id
      ) {
        recent.push(object);
        storeData(recent);
      } else {
        if (
          route.params.category !== 'watchlist' &&
          type === 'tv' &&
          object.id === element.id &&
          object.episode !== element.episode
        ) {
          recent.push(object);
          storeData(recent);
        } else if (
          route.params.category !== 'watchlist' &&
          type === 'tv' &&
          object.id !== element.id
        ) {
          recent.push(object);
          storeData(recent);
        }
      }
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#151515'}}>
      <Icon
        onPress={() => navigation.goBack()}
        color="white"
        name="arrow-back"
        size={height * 0.04}
        style={{
          zIndex: 1,
          position: 'absolute',
          left: 10,
          top: height * 0.015,
        }}
      />
      {showRefresh && (
        <>
          <View style={{height, width, backgroundColor: 'black'}} />
          <Icon
            onPress={() => {
              setShowRefresh(false);
              if (browserRef) {
                browserRef.current.reload();
              }
            }}
            size={height * 0.03}
            style={{
              zIndex: 1,
              position: 'absolute',
              left: width * 0.47,
              top: height * 0.45,
            }}
            name="refresh"
            color="white"
          />
        </>
      )}
      <WebView
        ref={browserRef}
        source={{uri: source}}
        originWhitelist={['*']}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        scrollEnabled={true}
        startInLoadingState
        useWebKit
        style={{opacity: 0.99}}
        forceDarkOn
        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 OPR/90.0.4480.84"
        setSupportMultipleWindows={false}
        onNavigationStateChange={navState => {
          const {url, canGoBack} = navState;
          console.log(url);
          if (
            url.startsWith('https://database.gdriveplayer.us/player.php') ||
            url.startsWith('https://membed.net/streaming.php?')
          ) {
            return true;
          } else if (url.startsWith('https://vidcloud.icu/')) {
            setSource(
              url.replace('https://vidcloud.icu/', 'https://membed.net/'),
            );
            return true;
          } else if (
            url.startsWith(
              'http://gdrivedownload.us/' || 'https://membed.net/download',
            )
          ) {
            browserRef.current.stopLoading();
            Linking.openURL(url);
            return false;
          } else {
            browserRef.current.stopLoading();
            if (canGoBack) {
              browserRef.current.goBack();
            }
            return false;
          }
        }}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          ToastAndroid.show('Network Error', ToastAndroid.LONG);
          setShowRefresh(true);
        }}
        bounces={false}
        onLoadProgress={e => {
          const state = e.nativeEvent;
          if (
            state.url.startsWith(
              'https://database.gdriveplayer.us/player.php',
            ) ||
            state.url.startsWith('https://membed.net/streaming.php?')
          ) {
            return true;
          } else if (state.url.startsWith('https://vidcloud.icu/')) {
            setSource(
              state.url.replace('https://vidcloud.icu/', 'https://membed.net/'),
            );
            return true;
          } else if (
            state.url.startsWith(
              'http://gdrivedownload.us/' || 'https://membed.net/download',
            )
          ) {
            browserRef.current.stopLoading();
            Linking.openURL(state.url);
            return false;
          } else {
            browserRef.current.stopLoading();
            if (state.canGoBack) {
              browserRef.current.goBack();
            }
            return false;
          }
        }}
        onLoadEnd={e => {
          const state = e.nativeEvent;
          console.log(state.url);
          if (
            state.url.startsWith(
              'https://database.gdriveplayer.us/player.php',
            ) ||
            state.url.startsWith('https://membed.net/streaming.php?')
          ) {
            return true;
          } else if (state.url.startsWith('https://vidcloud.icu/')) {
            setSource(
              state.url.replace('https://vidcloud.icu/', 'https://membed.net/'),
            );
            return true;
          } else if (
            state.url.startsWith(
              'http://gdrivedownload.us/' || 'https://membed.net/download',
            )
          ) {
            browserRef.current.stopLoading();
            Linking.openURL(state.url);
            return false;
          } else {
            browserRef.current.stopLoading();
            if (state.canGoBack) {
              browserRef.current.goBack();
            }
            return false;
          }
        }}
        onLoad={e => {
          const state = e.nativeEvent;
          console.log(state.url);
          addToRecent();
          if (
            state.url.startsWith(
              'https://database.gdriveplayer.us/player.php',
            ) ||
            state.url.startsWith('https://membed.net/streaming.php?')
          ) {
            return true;
          } else if (state.url.startsWith('https://vidcloud.icu/')) {
            setSource(
              state.url.replace('https://vidcloud.icu/', 'https://membed.net/'),
            );
            return true;
          } else if (
            state.url.includes(
              'http://gdrivedownload.us/' || 'https://membed.net/download',
            )
          ) {
            browserRef.current.stopLoading();
            Linking.openURL(state.url);
            return false;
          } else {
            browserRef.current.stopLoading();
            if (state.canGoBack) {
              browserRef.current.goBack();
            }
            return false;
          }
        }}
        onShouldStartLoadWithRequest={request => {
          console.log(request.url);
          if (
            request.url.startsWith(
              'https://database.gdriveplayer.us/player.php',
            ) ||
            request.url.startsWith('https://membed.net/streaming.php?')
          ) {
            return true;
          } else if (request.url.startsWith('https://vidcloud.icu/')) {
            setSource(
              request.url.replace(
                'https://vidcloud.icu/',
                'https://membed.net/',
              ),
            );
            return true;
          } else if (
            request.url.startsWith(
              'http://gdrivedownload.us/' || 'https://membed.net/download',
            )
          ) {
            browserRef.current.stopLoading();
            Linking.openURL(request.url);
            return false;
          } else {
            browserRef.current.stopLoading();
            if (request.canGoBack) {
              browserRef.current.goBack();
            }
            return false;
          }
        }}
      />
    </View>
  );
}
