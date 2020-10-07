import * as React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Calendar from './src/components/calendar/Calendar'
import Contact from './src/components/contact/Contact'
import KartuNama from './src/components/KartuNama/kartu_nama'

const TabNavigator = createBottomTabNavigator({
  Contact: Contact,
<<<<<<< HEAD
  Calendar: Calendar,
  KartuNama: KartuNama,
=======
  Calendar: Calendar
>>>>>>> 5c57ce128d4ba98eaccda310b80a8b674d4943c4
});

export default createAppContainer(
  TabNavigator
);