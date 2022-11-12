import React, {useEffect} from 'react';
import {View, Dimensions, BackHandler} from 'react-native';
import {MovieStyles} from './styles';
import {List} from './List';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');
const HEADER_HEIGHT = width * 0.12;
export default function Profile({navigation, route}) {
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
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  return (
    <View style={MovieStyles.container}>
      <View style={{height: HEADER_HEIGHT}}>
        <Icon
          onPress={() => handleBackButtonClick()}
          color="white"
          name="arrow-back"
          size={height * 0.04}
          style={{position: 'absolute', left: 10, top: height * 0.025}}
        />
      </View>
      <List
        type={route.params.type}
        id={route.params.id}
        data={route.params.data}
        category="personality"
      />
    </View>
  );
}
