import React from 'react';
import {View, Dimensions, Text} from 'react-native';
import {MovieStyles, styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');
const HEADER_HEIGHT = width * 0.12;
export default function SearchingFor({navigation}) {
  return (
    <View style={MovieStyles.container}>
      <View style={{height: HEADER_HEIGHT}}>
        <Icon
          onPress={() => navigation.goBack()}
          color="white"
          name="arrow-back"
          size={height * 0.045}
          style={{position: 'absolute', left: 10, top: height * 0.025}}
        />
      </View>
      <Text
        style={{
          fontFamily: 'godofwar',
          position: 'absolute',
          top: height * 0.07,
          left: width * 0.12,
          fontSize: height * 0.025,
          color: 'white',
        }}>
        What are you Searching for?
      </Text>
      <View
        style={{position: 'absolute', top: height * 0.16, left: width * 0.37}}>
        <Text
          onPress={() =>
            navigation.navigate('Search', {
              type: 'movie',
              title: 'Movie',
              category: 'search',
            })
          }
          style={styles.text2}>
          Movie
        </Text>
        <Text
          onPress={() =>
            navigation.navigate('Search', {
              type: 'tv',
              title: 'Tv Serie',
              category: 'search',
            })
          }
          style={styles.text2}>
          TV Show
        </Text>
        <Text
          onPress={() =>
            navigation.navigate('Search', {
              type: 'person',
              title: 'Personality',
              category: 'personSearch',
            })
          }
          style={styles.text2}>
          Personality
        </Text>
      </View>
    </View>
  );
}
