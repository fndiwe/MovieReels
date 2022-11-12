import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import All from './All';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import Genres from './Genres';
import Trending from './Trending';
import TopRated from './TopRated';
import Kids from './Kids';
import OnTheAir from './OnTheAir';
import AiringToday from './AiringToday';
import NewMovies from './NewMovies';

const Tab = createMaterialTopTabNavigator();

export default function TopNavBar(props) {
  const name = props.type === 'movie' ? 'New Movies' : 'New TV Shows';
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#b6b9ba',
        tabBarIndicatorStyle: {
          backgroundColor: '#371B58',
          height: height * 0.005,
        },
        tabBarLabelStyle: {fontSize: height * 0.016, fontFamily: 'godofwar'},
        tabBarItemStyle: {width: 100},
        tabBarStyle: {backgroundColor: '#0C0C0C'},
      }}>
      <Tab.Screen
        name="Top 20"
        component={All}
        initialParams={{name: name, type: props.type}}
      />
      {props.type === 'movie' ? (
        <Tab.Screen
          name={name}
          component={NewMovies}
          initialParams={{name: name, type: props.type}}
        />
      ) : (
        <Tab.Screen
          name={name}
          component={NewMovies}
          initialParams={{name: name, type: props.type}}
        />
      )}
      {props.type === 'tv' && (
        <>
          <Tab.Screen name="On Air" component={OnTheAir} />
          <Tab.Screen name="Airing Today" component={AiringToday} />
        </>
      )}
      <Tab.Screen
        name="Trending Now"
        component={Trending}
        initialParams={{type: props.type}}
      />
      <Tab.Screen
        name="Top Rated"
        component={TopRated}
        initialParams={{type: props.type}}
      />
      <Tab.Screen
        name="Genres"
        component={Genres}
        initialParams={{type: props.type}}
      />
      <Tab.Screen
        name="Kids"
        component={Kids}
        initialParams={{type: props.type}}
      />
    </Tab.Navigator>
  );
}
