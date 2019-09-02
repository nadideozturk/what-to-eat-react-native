import React from 'react';
import {
  AsyncStorage,
  View,
  Button,
} from 'react-native';
import * as Google from 'expo-google-app-auth';
import Config from '../config.json';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    const config = {
      androidClientId: Config.androidClientId,
    };

    // First- obtain access token from Expo's Google API
    const { type, accessToken, user } = await Google.logInAsync(config);

    if (type === 'success') {
      await AsyncStorage.setItem('userToken', accessToken);
      this.props.navigation.navigate('App');

      // Then you can use the Google REST API
      // let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      //   headers: { Authorization: `Bearer ${accessToken}` },
      // });
    }
  };
}
