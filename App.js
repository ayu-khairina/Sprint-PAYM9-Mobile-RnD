import * as React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Calendar from './src/components/calendar/Calendar'
import Contact from './src/components/contact/Contact'
import Piutang from './src/components/piutang/piutang'
const TabNavigator = createBottomTabNavigator({
  Contact: Contact,
  Calendar: Calendar,
  Piutang: Piutang
});

export default createAppContainer(
  TabNavigator
);