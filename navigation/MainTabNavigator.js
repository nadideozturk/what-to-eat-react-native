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
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
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
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SuggestionsStack = createStackNavigator({
  SuggestionsWhatIsThisTodo: SuggestionsScreen,
});

SuggestionsStack.navigationOptions = {
  tabBarLabel: 'Suggestions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomemadeStack,
  DineoutStack,
  SuggestionsStack,
});
