import React from 'react';
import { Platform, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Cook',
  tabBarIcon: ({ focused }) => (
    <Image
      source={
        focused
        ? require(`../assets/images/cook-active.png`)
        : require(`../assets/images/cook-inactive.png`)
      }
      fadeDuration={0}
      style={{ marginBottom: -3, width: 26, height: 26 }}
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Order',
  tabBarIcon: ({ focused }) => (
    <Image
      source={
        focused
        ? require(`../assets/images/order-active.png`)
        : require(`../assets/images/order-inactive.png`)
      }
      fadeDuration={0}
      style={{ marginBottom: -3, width: 26, height: 26 }}
    />
  ),
};

LinksStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
});

tabNavigator.path = '';

export default tabNavigator;
