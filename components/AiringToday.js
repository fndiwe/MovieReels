import React from "react";
import { View } from 'react-native';
import { MovieStyles } from "./styles";
import { List } from "./List";

export default function AiringToday({ navigation }) {
    return (
    <View style={MovieStyles.container}>
    <List categoryTitle="Airing Today" type="tv" category="airing_today" />
    </View>
    )
}