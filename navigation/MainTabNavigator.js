import React from 'react';
import { Platform, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomemadeMealsScreen from '../screens/HomemadeMealsScreen';
import HomemadeMealDetailsScreen from '../screens/HomemadeMealDetailsScreen';
import NewHomemadeMealScreen from '../screens/NewHomemadeMealScreen';
import OutsideMealsScreen from '../screens/OutsideMealsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomemadeMealsStack = createStackNavigator(
  {
    HomemadeMeals: HomemadeMealsScreen,
    HomemadeMealDetails: HomemadeMealDetailsScreen,
    NewHomemadeMeal: NewHomemadeMealScreen,
  },
  {
    ...config,
    initialRouteName: 'HomemadeMeals',
  }
);

HomemadeMealsStack.navigationOptions = {
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

HomemadeMealsStack.path = '';

const OutsideMealsStack = createStackNavigator(
  {
    OutsideMeals: OutsideMealsScreen,
  },
  config
);

OutsideMealsStack.navigationOptions = {
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

OutsideMealsStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
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

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomemadeMealsStack,
  OutsideMealsStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
