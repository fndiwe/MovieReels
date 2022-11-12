import React from "react";
import { View } from 'react-native';
import { MovieStyles } from "./styles";
import {List} from "./List";

export default function Trending({ navigation, route }) {
    return (
        <View style={MovieStyles.container}>       
        <List type={route.params.type} categoryTitle="Trending Now" category="trending" />
    </View>
    )
}