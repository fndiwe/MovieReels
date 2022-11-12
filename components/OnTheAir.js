import React from "react";
import { View } from 'react-native';
import { MovieStyles } from "./styles";
import {List} from "./List";
export default function OnTheAir({ navigation }) {
    return (
    <View style={MovieStyles.container}>
    <List categoryTitle="On The Air" type="tv" category="on_the_air" />
    </View>
    )
}