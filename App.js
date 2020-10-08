import * as React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Calendar from './src/components/calendar/Calendar'
import Contact from './src/components/contact/Contact'
import KartuNama from './src/components/KartuNama/kartu_nama'
import Piutang from './src/components/piutang/piutang'
import Camera from './src/components/camera/Camera'

const ContactStack = createStackNavigator({ 
  Contact: {
    screen: Contact,
  },
  Camera :{
    screen: Camera,
  },
  Piutang :{
    screen: Piutang,
  }

});

const TabNavigator = createBottomTabNavigator({
  Contact: ContactStack,
  Calendar: Calendar,
  KartuNama: KartuNama,
  Piutang: Piutang
});

export default createAppContainer(
  TabNavigator
);