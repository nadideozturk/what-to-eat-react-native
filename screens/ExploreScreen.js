import React from 'react';
import * as Permissions from 'expo-permissions';
import { Container, Header, Body, Item, Input, Icon, Button, Text } from 'native-base';
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
    header: null,
  };

  render() {
    const { location } = this.state;

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Body>
          <Button onPress={this.getLocationAsync}>
            <Text>OK</Text>
          </Button>
          <Text>{JSON.stringify(location)}</Text>
        </Body>
      </Container>
    );
  }
}
