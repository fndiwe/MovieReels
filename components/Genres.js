import React from "react";
import { View } from 'react-native';
import { MovieStyles } from "./styles";
import {GenreListMovie} from "./GenreListMovie"
import { GenreListTV } from "./GenreListTV";
export default function Genres({ navigation, route }) {
    return (
        <View style={MovieStyles.container}>
        {route.params.type === "tv" ? <GenreListTV /> : <GenreListMovie />}
    </View>
    )
}