import React from 'react';
import { Header, Body, Container, Content, Card, CardItem, Text } from 'native-base';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Explore from '../components/explore/Explore';
import { navigationShape } from '../constants/Shapes';

export default class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,
      hasLocationPermssion: 'undetermined',
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    this.willFocusSubscription = navigation.addListener(
      'willFocus',
      async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        console.log(status);
        this.setState({ hasLocationPermssion: status });
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          this.setState({ location });
        }
      },
    );
  }

  static navigationOptions = {
    header: Constants.platform.ios ? null : undefined,
    title: Constants.platform.ios ? null : 'Explore',
  };

  render() {
    const { hasLocationPermssion, location } = this.state;

    if (hasLocationPermssion === 'granted') {
      return (
        <Explore
          location={location}
        />
      );
    }
    return (
      <Container>
        <Header />
        <Content padder>
          <Card>
            <CardItem header>
              <Text style={{ fontSize: 40, paddingRight: 5 }}>🙈</Text>
              <Text>Please Allow Access to Your Location</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  This allows WhatToEat to know your location and show to recommendations based on what others people eating currently in your area.
                  Please give permission from settings. Enable location permission from settings.
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

ExploreScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
