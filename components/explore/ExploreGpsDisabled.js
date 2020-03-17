import React from 'react';
import PropTypes from 'prop-types';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Body, Container, Content, Card, CardItem, Text } from 'native-base';

export default class ExploreGpsDisabled extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getLocationAsync = this.getLocationAsync.bind(this);
  }

  getLocationAsync = async () => {
    const { onLocationPermissionChanged, onLocationChanged } = this.props;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      // this.setState({
      //   errorMessage: 'Permission to access location was denied',
      // });
      onLocationPermissionChanged(false);
    } else {
      onLocationPermissionChanged(true);
    }

    onLocationChanged(await Location.getCurrentPositionAsync({}));
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header>
              <Text>Allow Access</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Please enable to location services for WhatToEat.So we can show you best recommendations based on what others eat currently.</Text>
              </Body>
            </CardItem>
            <CardItem footer button block info onPress={this.getLocationAsync}>
              <Text>OK, Got it!</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

ExploreGpsDisabled.propTypes = {
  onLocationPermissionChanged: PropTypes.func.isRequired,
  onLocationChanged: PropTypes.func.isRequired,
};
