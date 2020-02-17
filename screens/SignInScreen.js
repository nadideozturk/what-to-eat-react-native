import React from 'react';
import { AsyncStorage, Image } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
} from 'native-base';
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
    header: null,
  };

  render() {
    return (
      <Container
        style={{
          backgroundColor: '#F5D97E',
          height: '100%',
          alignItems: 'center',
        }}
      >
        <Content>
          <Image
            source={
                // eslint-disable-next-line global-require
                require('../assets/images/logo.png')
            }
            fadeDuration={0}
            style={{ width: 260, height: 260, paddingTop: 450 }}
          />
          {/* eslint-disable-next-line no-underscore-dangle */}
          <Button style={{ backgroundColor: '#fef2f2', justifyContent: 'center', marginBottom: 10 }} light onPress={this._signInAsync}><Text>Sign in with Google</Text></Button>
          <Button style={{ backgroundColor: '#fef2f2', justifyContent: 'center', marginBottom: 10 }} light><Text>Sign in with Facebook</Text></Button>
          <Button style={{ justifyContent: 'center' }} dark transparent><Text>Maybe later</Text></Button>
        </Content>
      </Container>
    );
  }
}

SignInScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
