import React from 'react';
import {
  View,
  Text,
} from 'react-native';

export default class NewHomemadeMealScreen extends React.Component {
  static navigationOptions = {
    title: 'New Homemade Meal ',
  };

  render() {
    return (
      <View>
        <Text>New meal screen</Text>
      </View>
    );
  }
}
