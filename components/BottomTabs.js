import React from 'react';
import {Dimensions} from 'react-native';
import Movies from './Movies';
import TV from './TV';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const {width, height} = Dimensions.get('window');
import WatchList from './WatchList';
import Menu from './Menu';
const Tab = createBottomTabNavigator();
export const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: '#371B58',
        tabBarInactiveTintColor: '#b6b9ba',
        tabBarStyle: {
          backgroundColor: 'black',
          position: 'absolute',
          width: width * 0.93,
          left: width * 0.033,
          borderRadius: 100,
          height: height * 0.08,
          borderTopWidth: 0,
          bottom: height * 0.01,
        },
      }}>
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="theaters"
              size={size ? size : height * 0.04}
              color={focused ? color : '#b6b9ba'}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TV Series"
        component={TV}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="live-tv"
              size={size ? size : height * 0.04}
              color={focused ? color : '#b6b9ba'}
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Watchlist"
        component={WatchList}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="bookmark"
              size={size ? size : height * 0.04}
              color={focused ? color : '#b6b9ba'}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="menu"
              size={size ? size : height * 0.04}
              color={focused ? color : '#b6b9ba'}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
