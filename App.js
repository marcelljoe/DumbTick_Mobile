import React from 'react';
import {View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



import Home from './screens/Home';
import CategoryEvents from './screens/CategoryEvents';
import EventDetail from './screens/EventDetail';


const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  CategoryEvents: {
    screen: CategoryEvents
  },
  EventDetail: {
    screen: EventDetail
  },
}, {
  headerMode: 'none',
  initialRouteName: 'Home'
});

export default createAppContainer(AppNavigator);