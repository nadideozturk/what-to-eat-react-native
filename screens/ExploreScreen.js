import React from 'react';
import {
  View,
  Text,
} from 'react-native';

export default class ExploreScreen extends React.Component {
  static navigationOptions = {
    title: 'Explore',
  };

  render() {
    return (
      <View>
        <Text>
        Explore Tab
        </Text>
      </View>
    );
  }
}
