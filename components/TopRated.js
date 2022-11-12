import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {MovieStyles} from './styles';
import {List} from './List';
export default function TopRated({navigation, route}) {
  return (
    <View style={MovieStyles.container}>
      <List
        categoryTitle="Top Rated"
        type={route.params.type}
        category="top_rated"
      />
    </View>
  );
}
