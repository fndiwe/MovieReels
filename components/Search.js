import React, {useEffect, useState} from 'react';
import {BackHandler, View, Dimensions, Text, TextInput} from 'react-native';
import {MovieStyles} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');
import {List} from './List';

const HEADER_HEIGHT = width * 0.12;
export default function Searching({navigation, route}) {
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const {type, title, category} = route.params;
  const placeholder = `Type any ${title} name`;
  const handleSubmit = () => {
    if (search !== '') {
      setShowSearch(true);
    }
  };
  function handleBackButtonClick() {
    navigation.navigate('Movies');
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
        <Text
          style={{
            color: 'white',
            marginTop: width * 0.055,
            textAlign: 'center',
            fontFamily: 'godofwar',
            fontSize: width * 0.05,
          }}>
          Search {title}
        </Text>
        <Icon
          onPress={() => navigation.goBack()}
          color="white"
          name="arrow-back"
          size={height * 0.04}
          style={{position: 'absolute', left: 10, top: height * 0.015}}
        />
      </View>
      <TextInput
        placeholderTextColor="white"
        onChangeText={text => {
          setShowSearch(false);
          setSearch(text);
        }}
        onSubmitEditing={() => handleSubmit()}
        defaultValue={search}
        autoCapitalize="sentences"
        autoFocus
        spellCheck={false}
        placeholder={placeholder}
        returnKeyType="search"
        style={{
          color: 'white',
          fontFamily: 'space_mono_regular',
          fontSize: height * 0.025,
          borderBottomWidth: 3,
          width: width * 0.95,
          alignSelf: 'center',
          borderBottomColor: '#371B58',
          backgroundColor: '#0C0C0C',
          marginTop: 5,
        }}
      />
      {showSearch && (
        <List title={title} type={type} category={category} query={search} />
      )}
    </View>
  );
}
