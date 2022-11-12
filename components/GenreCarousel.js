import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {MovieData} from './genreDataMovie';
import {TVData} from './genreDataTV';
import {MovieStyles} from './styles';
import {useNavigation} from '@react-navigation/native';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const MovieImageCarousel = props => {
  const navigation = useNavigation();
  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Genre', {
            name: item.name + ' Movies',
            id: item.id,
            type: 'movie',
          })
        }
        activeOpacity={0.6}
        style={styles.item}>
        <ParallaxImage
          source={item.image}
          containerStyle={styles.imageContainer}
          style={styles.image}
          fadeDuration={1000}
          defaultSource={require('../assets/images/fallback.png')}
          parallaxFactor={1.5}
          spinnerColor="white"
          {...parallaxProps}
        />
        <Text style={[MovieStyles.text, {marginBottom: 10}]} numberOfLines={2}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth * 0.33}
        data={MovieData}
        renderItem={renderItem}
        hasParallaxImages={true}
        inactiveSlideOpacity={0.2}
      />
    </View>
  );
};
const TVImageCarousel = props => {
  const navigation = useNavigation();
  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Genre', {
            name: item.name + ' TV Shows',
            id: item.id,
            type: 'tv',
          })
        }
        activeOpacity={0.6}
        style={styles.item}>
        <ParallaxImage
          source={item.image}
          containerStyle={styles.imageContainer}
          style={styles.image}
          defaultSource={require('../assets/images/fallback.png')}
          fadeDuration={1000}
          parallaxFactor={0.9}
          spinnerColor="white"
          {...parallaxProps}
        />
        <Text style={[MovieStyles.text, {marginBottom: 20}]} numberOfLines={2}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth * 0.33}
        data={TVData}
        renderItem={renderItem}
        hasParallaxImages={true}
        inactiveSlideOpacity={0.2}
      />
    </View>
  );
};
export {MovieImageCarousel};
export {TVImageCarousel};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    marginBottom: Platform.select({ios: 0, android: screenHeight * 0.005}), // Prevent a random Android rendering issue
    backgroundColor: '#151515',
    borderRadius: 5,
    width: screenWidth * 0.33,
    height: screenHeight * 0.23,
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    marginBottom: Platform.select({ios: 0, android: screenHeight * 0.005}), // Prevent a random Android rendering issue
    backgroundColor: 'black',
    borderRadius: 5,
    width: screenWidth * 0.33,
    height: screenHeight * 0.23,
  },
});
