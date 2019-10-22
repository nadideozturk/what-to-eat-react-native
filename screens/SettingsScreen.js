import React from 'react';
import {
  AsyncStorage,
  View,
  Button,
} from 'react-native';
import { navigationShape } from '../constants/Shapes';

export default class SettingsScreen extends React.Component {
  _signOutAsync = async () => {
    const { navigation } = this.props;

    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };

  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <View>
        {/* eslint-disable-next-line no-underscore-dangle */}
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
      </View>
    );
  }
}

SettingsScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
