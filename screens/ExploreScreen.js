import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Button } from 'native-base';
import * as Location from 'expo-location';

export default class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,
    };
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.setState({ location });
  };

  static navigationOptions = {
    title: 'Explore',
  };

  render() {
    const { location } = this.state;

    return (
      <View>
        <Text>
        Explore Tab
        </Text>
        <Button onPress={this.getLocationAsync}>
          <Text>OK</Text>
        </Button>
        <Text>{JSON.stringify(location)}</Text>
      </View>
    );
  }
}
