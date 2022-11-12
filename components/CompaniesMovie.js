import React from 'react';
import {View, Dimensions} from 'react-native';
import {MovieStyles} from './styles';
import {List} from './List';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');
const HEADER_HEIGHT = width * 0.12;
export default function CompanyMovies({navigation, route}) {
  return (
    <View style={MovieStyles.container}>
      <View style={{height: HEADER_HEIGHT}}>
        <Icon
          onPress={() => navigation.goBack()}
          color="white"
          name="arrow-back"
          size={height * 0.04}
          style={{position: 'absolute', left: 10, top: height * 0.025}}
        />
      </View>
      <List
        id={route.params.id}
        categoryTitle={route.params.name}
        type="movie"
        category="companies"
      />
    </View>
  );
}
