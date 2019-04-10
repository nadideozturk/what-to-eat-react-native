import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomemadeScreen from '../screens/HomemadeScreen';
import DineoutScreen from '../screens/DineoutScreen';
import SuggestionsScreen from '../screens/SuggestionsScreen';

const HomemadeStack = createStackNavigator({
  HomemadeWhatIsThisTodo: HomemadeScreen,
});

HomemadeStack.navigationOptions = {
  tabBarLabel: 'Homemade',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const DineoutStack = createStackNavigator({
  DineoutWhatIsThisTodo: DineoutScreen,
});

DineoutStack.navigationOptions = {
  tabBarLabel: 'Dineout',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-restaurant' : 'md-restaurant'}
    />
  ),
};

const SuggestionsStack = createStackNavigator({
  SuggestionsWhatIsThisTodo: SuggestionsScreen,
});

SuggestionsStack.navigationOptions = {
  tabBarLabel: 'Delivery',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-bicycle' : 'md-bicycle'}
    />
  ),
};

export default createBottomTabNavigator({
  HomemadeStack,
  DineoutStack,
  SuggestionsStack,
});
