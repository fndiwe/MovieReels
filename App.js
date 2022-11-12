import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Search from './components/Search';
import {BottomTabs} from './components/BottomTabs';
import Profile from './components/Profile';
import GenreMovies from './components/GenreMovies';
import CompanyMovies from './components/CompaniesMovie';
import Preview from './components/Preview';
import Player from './components/Player';
import Episodes from './components/Episodes';

const Stack = createNativeStackNavigator();
function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={BottomTabs}
          options={{headerShown: false, orientation: 'portrait'}}
        />
        <Stack.Screen
          name="Preview"
          component={Preview}
          options={{
            headerShown: false,
            orientation: 'portrait',
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false, orientation: 'portrait'}}
        />
        <Stack.Screen
          name="Genre"
          component={GenreMovies}
          options={{headerShown: false, orientation: 'portrait'}}
        />
        <Stack.Screen
          name="Companies"
          component={CompanyMovies}
          options={{headerShown: false, orientation: 'portrait'}}
        />
        <Stack.Screen
          name="Episodes"
          component={Episodes}
          options={{headerShown: false, orientation: 'portrait'}}
        />
        <Stack.Screen
          name="Player"
          component={Player}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
