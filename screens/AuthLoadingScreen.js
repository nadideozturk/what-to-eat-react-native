import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { navigationShape } from '../constants/Shapes';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('idToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    const { navigation } = this.props;
    navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <Text>Signing in...</Text>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

AuthLoadingScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
