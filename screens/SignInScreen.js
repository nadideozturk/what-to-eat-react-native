import React from 'react';
import { AsyncStorage } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
} from 'native-base';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import Config from '../config.json';
import { navigationShape } from '../constants/Shapes';
import Image from '../components/Image';
import Spinner from '../components/Spinner';

export default class SignInScreen extends React.Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      inProgress: false,
    };
    this.googleSignInAsync = this.googleSignInAsync.bind(this);
    this.facebookSignInAsync = this.facebookSignInAsync.bind(this);
    this.onSuccessfulLogin = this.onSuccessfulLogin.bind(this);
  }

  onSuccessfulLogin = async (idToken, navigation) => {
    await AsyncStorage.setItem('idToken', idToken);
    navigation.navigate('App');
  }

  facebookSignInAsync = async () => {
    this.setState({ inProgress: true });
    const { navigation } = this.props;

    try {
      await Facebook.initializeAsync(Config.facebookAppId);
      const fbResponse = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      const { type, token } = fbResponse;
      if (type === 'success') {
        this.setState({ inProgress: false });
        await this.onSuccessfulLogin(token, navigation);
      }
    } catch (e) {
      this.setState({ inProgress: false });
      alert(`Facebook login failed: ${e.message}`);
    }
  }

  googleSignInAsync = async () => {
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
      try {
        const { type, idToken } = await Google.logInAsync(config);
        if (type === 'success') {
          this.setState({ inProgress: false });
          await this.onSuccessfulLogin(idToken, navigation);
        }
      } catch (e) {
        this.setState({ inProgress: false });
        alert(`Google login failed: ${e.message}`);
      }
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
              contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
            >
              <Spinner />
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
                onPress={this.googleSignInAsync}
                style={{ backgroundColor: '#fef2f2', justifyContent: 'center', marginBottom: 10 }}
                light
              >
                <Text>Sign in with Google</Text>
              </Button>
              <Button
                onPress={this.facebookSignInAsync}
                style={{ backgroundColor: '#fef2f2', justifyContent: 'center', marginBottom: 10 }}
                light
              >
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
