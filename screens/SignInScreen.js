import React from 'react';
import {
  AsyncStorage,
  View,
  Button,
} from 'react-native';
import * as Google from 'expo-google-app-auth';
import Config from '../config.json';
import { navigationShape } from '../constants/Shapes';

export default class SignInScreen extends React.Component {
  _signInAsync = async () => {
    const { navigation } = this.props;

    const config = {
      androidClientId: Config.androidClientId,
      iosClientId: Config.iosClientId,
    };

    // First- obtain access token from Expo's Google API
    const { type, idToken } = await Google.logInAsync(config);

    // console.log("user object is " + JSON.stringify(user));
    // console.log("logInAsync response: " + JSON.stringify(test));

    if (type === 'success') {
      await AsyncStorage.setItem('idToken', idToken);
      navigation.navigate('App');

      // Then you can use the Google REST API
      // let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      //   headers: { Authorization: `Bearer ${accessToken}` },
      // });
    }
  };

  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View>
        {/* eslint-disable-next-line no-underscore-dangle */}
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }
}

SignInScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
