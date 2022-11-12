import React from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { companies } from "./companies";
import { MovieStyles } from "./styles";
export const CompaniesCarousel = (props) => {
  const navigation = useNavigation();
  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Companies", {
            name: item.name + " Movies",
            id: item.id,
          })
        }
        activeOpacity={0.6}
        style={styles.item}
      >
        <ParallaxImage
          source={item.logo_path}
          containerStyle={styles.imageContainer}
          style={styles.image}
          fadeDuration={1000}
          parallaxFactor={1.5}
          spinnerColor="white"
          {...parallaxProps}
        />
        <Text
          style={[MovieStyles.text, { marginBottom: 10 }]}
          numberOfLines={2}
        >
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
        itemWidth={screenWidth * 0.65}
        data={companies.results}
        renderItem={renderItem}
        hasParallaxImages={true}
        inactiveSlideOpacity={0.2}
        useScrollView={true}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth * 0.65,
    height: screenHeight * 0.3,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "black",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
  },
});
