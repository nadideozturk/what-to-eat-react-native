import React from 'react';
import { Container, Content, Text, Spinner, Button } from 'native-base';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as UserActions from '../actionCreators/UserActions';
import { navigationShape, userDetailsWithMetaDataShape } from '../constants/Shapes';
import Explore from '../components/explore/Explore';

class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.changeCityCountry = this.changeCityCountry.bind(this);
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
    header: Constants.platform.ios ? null : undefined,
    title: Constants.platform.ios ? null : 'Explore',
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
    const { city } = userDetailsWithMetadata.value;
    const { country } = userDetailsWithMetadata.value;

    if (!city || !country) {
      return (
        <Container>
          <Content padder>
            <Text>Please choose a city</Text>
            <Button
              onPress={() => navigation.navigate(
                'CityCountrySelector',
                {
                  onCityCountrySelected: this.changeCityCountry,
                },
              )}
            >
              <Text>Choose</Text>
            </Button>
          </Content>
        </Container>
      );
    }

    return (
      <Explore
        navigation={navigation}
      />
    );
  }
}

ExploreScreen.propTypes = {
  navigation: navigationShape.isRequired,
  dispatch: PropTypes.func.isRequired,
  userDetailsWithMetadata: userDetailsWithMetaDataShape.isRequired,
};

const mapStateToProps = state => ({
  userDetailsWithMetadata: state.userDetails,
});

export default connect(mapStateToProps)(ExploreScreen);
