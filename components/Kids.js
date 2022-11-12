import React from 'react';
import {View} from 'react-native';
import {MovieStyles} from './styles';
import {List} from './List';

export default function Kids({navigation, route}) {
  return (
    <View style={MovieStyles.container}>
      <List categoryTitle="Kids" type={route.params.type} category="kids" />
    </View>
  );
}
