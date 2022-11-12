import React from "react";
import { View } from 'react-native';
import { MovieStyles } from "./styles";
import {List} from "./List";

export default function NewMovies({ navigation, route }) {
    return (
    <View style={MovieStyles.container}>
    <List categoryTitle={route.params.name} type={route.params.type} category="new_movies" />
    </View>
    )
}