import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
import {
  RewardedInterstitialAd,
  RewardedAdEventType,
  TestIds,
  useInterstitialAd,
} from 'react-native-google-mobile-ads';
import FastImage from 'react-native-fast-image';
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

export default function DownView(props) {
  const navigation = useNavigation();
  let monthList = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let splittedDay = props.date.split('-');
  let year = splittedDay[0];
  let month = monthList[Number(splittedDay[1])];
  let day = splittedDay[2];

  const [loaded, setLoaded] = useState(false);

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
      navigation.navigate('Player', {
        type: 'tv',
        id: props.id,
        season: props.season,
        episode: props.episode,
        image: props.image1,
        title: props.title1,
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
          type: 'tv',
          id: props.id,
          season: props.season,
          episode: props.episode,
          image: props.image1,
          title: props.title1,
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

  function handleStream() {
    try {
      rewardedInterstitial.show();
    } catch (error) {
      if (isLoaded) {
        show();
      } else {
        navigation.navigate('Player', {
          type: 'tv',
          id: props.id,
          season: props.season,
          episode: props.episode,
          image: props.image1,
          title: props.title1,
          category: 'notwatchlist',
        });
      }
    }
  }
  return (
    <View style={styles.downView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.runtime}>{props.runtime} mins |</Text>
        <FastImage
          style={styles.imdb}
          source={require('../assets/images/imdb.png')}
        />
        <Text style={styles.rating}> {props.rating}</Text>
        <FastImage source={{uri: props.image}} style={styles.image} />
        <TouchableOpacity activeOpacity={0.9} style={styles.play}>
          <Icon
            onPress={() => handleStream()}
            style={{padding: 4}}
            color="white"
            name="play-arrow"
            size={screenHeight * 0.065}
          />
        </TouchableOpacity>
        <Text style={styles.date}>
          Premiere -{'>'} {day} {month}, {year}
        </Text>
        <Text style={styles.text}>{props.title}</Text>
        <Text style={styles.overview}>{props.overview}</Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  downView: {
    position: 'absolute',
    backgroundColor: 'black',
    height: screenHeight * 0.45,
    width: screenWidth,
    borderTopLeftRadius: screenWidth * 0.06,
    borderTopRightRadius: screenWidth * 0.06,
    bottom: 0,
  },

  play: {
    position: 'absolute',
    top: screenHeight * 0.047,
    backgroundColor: '#0c0c0c',
    borderRadius: 100,
    left: screenHeight * 0.06,
  },
  date: {
    position: 'absolute',
    paddingLeft: 5,
    fontFamily: 'space_mono_regular',
    fontSize: screenHeight * 0.02,
    top: screenHeight * 0.06,
    left: screenWidth * 0.37,
    color: 'white',
  },
  image: {
    width: screenWidth * 0.34,
    height: screenHeight * 0.12,
    borderRadius: 3,
    resizeMode: 'contain',
    marginTop: screenHeight * 0.02,
    marginLeft: screenWidth * 0.02,
  },
  text: {
    paddingRight: 5,
    paddingLeft: 5,
    fontFamily: 'batman',
    fontSize: screenHeight * 0.02,
    marginTop: screenWidth * 0.03,
    color: 'white',
  },
  overview: {
    paddingRight: 5,
    paddingLeft: 5,
    fontFamily: 'space_mono_regular',
    fontSize: screenHeight * 0.02,
    marginTop: screenWidth * 0.02,
    color: 'white',
  },
  runtime: {
    position: 'absolute',
    paddingRight: 5,
    paddingLeft: 5,
    fontFamily: 'space_mono_regular',
    fontSize: screenHeight * 0.02,
    top: screenHeight * 0.017,
    left: screenWidth * 0.37,
    color: 'white',
  },
  imdb: {
    position: 'absolute',
    width: screenWidth * 0.09,
    height: screenHeight * 0.025,
    top: screenHeight * 0.02,
    borderRadius: screenWidth * 0.006,
    left: screenWidth * 0.585,
  },
  rating: {
    position: 'absolute',
    fontFamily: 'space_mono_regular',
    fontSize: screenHeight * 0.02,
    top: screenHeight * 0.018,
    left: screenWidth * 0.68,
    color: 'white',
  },
});
