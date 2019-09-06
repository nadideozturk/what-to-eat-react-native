import React from 'react';
import {
  AsyncStorage,
  View,
  Text,
} from 'react-native';

export default class NewOutsideMealScreen extends React.Component {
  static navigationOptions = {
    title: 'New Outside Meal ',
  };

  render() {
    return (
      <View>
        <Text>New meal screen</Text>
      </View>
    );
  }
}
