import * as React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Calendar from './src/components/calendar/Calendar'
import Contact from './src/components/contact/Contact'
import KartuNama from './src/components/KartuNama/kartu_nama'

const TabNavigator = createBottomTabNavigator({
  Contact: Contact,
  Calendar: Calendar,
  KartuNama: KartuNama,
});

export default createAppContainer(
  TabNavigator
);