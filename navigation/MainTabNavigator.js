import React from 'react';
import { Platform, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomemadeMealsScreen from '../screens/HomemadeMealsScreen';
import HomemadeMealDetailsScreen from '../screens/HomemadeMealDetailsScreen';
import NewHomemadeMealScreen from '../screens/NewHomemadeMealScreen';
import OutsideMealsScreen from '../screens/OutsideMealsScreen';
import NewOutsideMealScreen from '../screens/NewOutsideMealScreen';
import OutsideMealDetailsScreen from '../screens/OutsideMealDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ExploreScreen from '../screens/ExploreScreen';
import CameraRollPermissionRequestScreen from '../screens/CameraRollPermissionRequestScreen';
import CameraRollPermissionRequestOutScreen from '../screens/CameraRollPermissionRequestOutScreen';
import EditHomemadeMealScreen from '../screens/EditHomemadeMealScreen';
import EditOutsideMealScreen from '../screens/EditOutsideMealScreen';
import TagSelectorScreen from '../screens/TagSelectorScreen';
import CityCountrySelectorScreen from '../screens/CityCountrySelectorScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomemadeMealsStack = createStackNavigator(
  {
    HomemadeMeals: HomemadeMealsScreen,
    HomemadeMealDetails: HomemadeMealDetailsScreen,
    NewHomemadeMeal: NewHomemadeMealScreen,
    CameraRollPermission: CameraRollPermissionRequestScreen,
    EditHomemadeMeal: EditHomemadeMealScreen,
    TagSelector: TagSelectorScreen,
  },
  {
    ...config,
    initialRouteName: 'HomemadeMeals',
  },
);

HomemadeMealsStack.navigationOptions = {
  tabBarLabel: 'Cook',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => (
    <Image
      source={
        focused
          // eslint-disable-next-line global-require
          ? require('../assets/images/cook-active.png')
          // eslint-disable-next-line global-require
          : require('../assets/images/cook-inactive.png')
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
    NewOutsideMeal: NewOutsideMealScreen,
    OutsideMealDetails: OutsideMealDetailsScreen,
    CameraRollPermissionOut: CameraRollPermissionRequestOutScreen,
    EditOutsideMeal: EditOutsideMealScreen,
    TagSelector: TagSelectorScreen,
  },
  config,
);

OutsideMealsStack.navigationOptions = {
  tabBarLabel: 'Order',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => (
    <Image
      source={
        focused
          // eslint-disable-next-line global-require
          ? require('../assets/images/order-active.png')
          // eslint-disable-next-line global-require
          : require('../assets/images/order-inactive.png')
      }
      fadeDuration={0}
      style={{ marginBottom: -3, width: 26, height: 26 }}
    />
  ),
};

OutsideMealsStack.path = '';

const ExploreStack = createStackNavigator(
  {
    Explore: ExploreScreen,
  },
  config,
);

ExploreStack.navigationOptions = {
  tabBarLabel: 'Explore',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => (
    <Image
      source={
        focused
          // eslint-disable-next-line global-require
          ? require('../assets/images/search-active.png')
          // eslint-disable-next-line global-require
          : require('../assets/images/search-inactive.png')
      }
      fadeDuration={0}
      style={{ marginBottom: -3, width: 26, height: 26 }}
    />
  ),
};

ExploreStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    CityCountrySelector: CityCountrySelectorScreen,
  },
  config,
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused }) => (
    <Image
      source={
        focused
          // eslint-disable-next-line global-require
          ? require('../assets/images/settings-active.png')
          // eslint-disable-next-line global-require
          : require('../assets/images/settings-inactive.png')
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
  ExploreStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
