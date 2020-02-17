import React from 'react';
import { AsyncStorage, Image } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Spinner,
} from 'native-base';
import * as Google from 'expo-google-app-auth';
import Config from '../config.json';
import { navigationShape } from '../constants/Shapes';

export default class SignInScreen extends React.Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      inProgress: false,
    };
    this.signInAsync = this.signInAsync.bind(this);
  }

  signInAsync = async () => {
    this.setState({ inProgress: true });
    const { navigation } = this.props;

    const config = {
      androidClientId: Config.androidClientId,
      iosClientId: Config.iosClientId,
    };

    // without setTimeout, there is a race condition between await
    // Google.logInAsync and react rendering which freezes the screen
    // for about one second, until Google SSO page opens
    setTimeout(async () => {
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
      this.setState({ inProgress: false });
    }, 50);
  };

  static navigationOptions = {
    header: null,
  };

  render() {
    const { inProgress } = this.state;

    return (
      <Container
        style={{
          backgroundColor: '#F5D97E',
          height: '100%',
          alignItems: 'center',
        }}
      >
        {inProgress
          ? (
            <Content
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <Spinner color="red" />
            </Content>
          )
          : (
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
              <Button
                style={{ backgroundColor: '#fef2f2', justifyContent: 'center', marginBottom: 10 }}
                light
                onPress={this.signInAsync}
              >
                <Text>Sign in with Google</Text>
              </Button>
              <Button style={{ backgroundColor: '#fef2f2', justifyContent: 'center', marginBottom: 10 }} light>
                <Text>Sign in with Facebook</Text>
              </Button>
              <Button style={{ justifyContent: 'center' }} dark transparent>
                <Text>Maybe later</Text>
              </Button>
            </Content>
          )}
      </Container>
    );
  }
}

SignInScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
