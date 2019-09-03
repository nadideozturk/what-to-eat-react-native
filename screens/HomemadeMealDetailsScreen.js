import React from 'react';
import {
  AsyncStorage,
  View,
  Text,
} from 'react-native';

export default class HomemadeMealDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Detail',
  };

  render() {
    const { navigation } = this.props;
    const meal = navigation.getParam('meal', '');

    return (
      <View>
        <Text>Detail Screen for {meal.name}</Text>
      </View>
    );
  }
}
