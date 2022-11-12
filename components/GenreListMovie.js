import React from "react";
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Image, Dimensions} from 'react-native';
import { MovieStyles } from "./styles";
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
import { MovieData } from "./genreDataMovie";
import { useNavigation } from '@react-navigation/native';
export const GenreListMovie = props => {
  const navigation = useNavigation()
const renderItem = ({item, index}) => {
  
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Genre", {
          name: item.name + " Movies",
          id: item.id,
          type: "movie"
        })} activeOpacity={0.6} style={styles.item}>
        <Image
          source={item.image}
          style={styles.image}
        />
        <Text style={MovieStyles.text} numberOfLines={2}>
         {item.name}
        </Text>
      </TouchableOpacity>
    );
  }
return (
    <View style={MovieStyles.container}>
    <Text style={MovieStyles.text}>Genres</Text> 
    <FlatList
     columnWrapperStyle={{justifyContent: 'space-around'}}
    showsVerticalScrollIndicator={false}
    data={MovieData}
    renderItem={renderItem}
    numColumns={2}
/>
</View>

)
    }
const styles = StyleSheet.create({
item: {
  width: screenWidth * 0.45,
  height: screenHeight * 0.22,
  marginBottom: screenHeight * 0.005,
},
image: {
    width: screenWidth * 0.45,
    height: screenHeight * 0.15,
  borderRadius: 8,  
  resizeMode: 'contain',
},
});