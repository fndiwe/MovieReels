import React, {useEffect, useState} from 'react';
import {View, Dimensions, Image, StatusBar} from 'react-native';
import {MovieStyles} from './styles';
import TopNavBar from './TopNavBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.07;
export default function Movies({navigation}) {
  const [showFullLogo, setShowFullLogo] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowFullLogo(false);
    }, 5000);
  }, []);
  return (
    <View style={MovieStyles.container}>
      <View style={{height: HEADER_HEIGHT}}>
        {showFullLogo ? (
          <Image
            style={MovieStyles.logo}
            source={require('../assets/images/logo.png')}
          />
        ) : (
          <Image
            style={MovieStyles.logo1}
            source={require('../assets/images/logo1.png')}
          />
        )}
        <Icon
          onPress={() =>
            navigation.navigate('Search', {
              type: 'movie',
              title: 'Movie',
              category: 'search',
            })
          }
          color="white"
          name="search"
          size={height * 0.051}
          style={MovieStyles.searchIcon}
        />
      </View>
      <TopNavBar type="movie" />
    </View>
  );
}
