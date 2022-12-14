// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../Screens/Home/Home';
import {ImageView} from '../Screens/Image/ImageView';
import {Album} from '../Screens/Album/Album';
import {BottomTab} from './ButtomTab';
import VideoList from '../Screens/Video/VideoList';

const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomTab"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomTab" component={BottomTab} />

        <Stack.Screen name="VideoList" component={VideoList} />
        <Stack.Screen name="ImageView" component={ImageView} />
        <Stack.Screen name="Album" component={Album} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
