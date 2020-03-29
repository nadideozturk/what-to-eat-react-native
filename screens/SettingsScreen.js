import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { Container, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch, Spinner } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as UserActions from '../actionCreators/UserActions';
import { navigationShape, userDetailsWithMetaDataShape } from '../constants/Shapes';

class SettingsScreen extends React.Component {
  signOutAsync = async () => {
    const { navigation } = this.props;

    await AsyncStorage.clear();
    navigation.navigate('Auth');

    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.changeCityCountry = this.changeCityCountry.bind(this);
  };

  toggleSwitch = value => {
    const { dispatch } = this.props;
    const { userDetailsWithMetadata } = this.props;
    const userDetails = userDetailsWithMetadata.value;

    if (!value) {
      Alert.alert(
        'Change Privacy',
        'Your account will be public. Anyone will able to see your meal photos on WhatToEat.',
        [
          {
            text: 'OK',
            onPress: () => UserActions.setUserPreferences({
              dispatch,
              user: {
                ...userDetails,
                isPrivate: false,
              },
            }),
          },
        ],
        { cancelable: false },
      );
    } else {
      Alert.alert(
        'Change Privacy',
        'Your account will be private. Nobody will able to see your meal photos on WhatToEat.',
        [
          {
            text: 'Change',
            onPress: () => UserActions.setUserPreferences({
              dispatch,
              user: {
                ...userDetails,
                isPrivate: true,
              },
            }),
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel pressed'),
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }
  }

  changeCityCountry = selectedCityCountry => {
    const { dispatch } = this.props;
    const { userDetailsWithMetadata } = this.props;
    const userDetails = userDetailsWithMetadata.value;

    UserActions.setUserPreferences({
      dispatch,
      user: {
        ...userDetails,
        city: selectedCityCountry.city,
        country: selectedCityCountry.country,
      },
    });
  }

  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    const { userDetailsWithMetadata, navigation } = this.props;
    if (userDetailsWithMetadata.loading) {
      return (
        <Spinner color="red" />
      );
    }
    if (typeof (userDetailsWithMetadata.value) === 'undefined') {
      return null;
    }
    const { isPrivate } = userDetailsWithMetadata.value;
    const { city } = userDetailsWithMetadata.value;
    const { country } = userDetailsWithMetadata.value;

    return (
      <Container>
        <Content>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: '#FF9501' }}>
                <Icon active name="lock" />
              </Button>
            </Left>
            <Body>
              <Text>Private Account</Text>
            </Body>
            <Right>
              <Switch
                onValueChange={this.toggleSwitch}
                value={isPrivate}
              />
            </Right>
          </ListItem>
          <ListItem
            icon
            onPress={() => navigation.navigate(
              'CityCountrySelector',
              {
                onCityCountrySelected: this.changeCityCountry,
              },
            )}
          >
            <Left>
              <Button style={{ backgroundColor: '#FF9501' }}>
                <Icon active name="pin" />
              </Button>
            </Left>
            <Body>
              <Text>
                {
                  city && country
                    ? `City: ${city}, ${country}`
                    : 'City: Select a city'
                }
              </Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={this.signOutAsync}>
            <Left>
              <Button style={{ backgroundColor: '#007AFF' }}>
                <Icon active name="ios-log-out" />
              </Button>
            </Left>
            <Body>
              <Text>Log Out</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

SettingsScreen.propTypes = {
  navigation: navigationShape.isRequired,
  dispatch: PropTypes.func.isRequired,
  userDetailsWithMetadata: userDetailsWithMetaDataShape.isRequired,
};

const mapStateToProps = state => ({
  userDetailsWithMetadata: state.userDetails,
});

export default connect(mapStateToProps)(SettingsScreen);
