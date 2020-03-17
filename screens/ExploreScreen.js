import React from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Explore from '../components/explore/Explore';
import ExploreGpsDisabled from '../components/explore/ExploreGpsDisabled';

export default class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,
      hasLocationPermssion: undefined,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    const hasLocationPermssion = status === 'granted';
    this.setState({ hasLocationPermssion });
    if (hasLocationPermssion) {
      const location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    }
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return false;
    }
    return true;
  };

  static navigationOptions = {
    header: null,
  };

  render() {
    const { hasLocationPermssion, location } = this.state;

    if (!hasLocationPermssion) {
      return (
        <ExploreGpsDisabled
          onLocationPermissionChanged={value => this.setState({ hasLocationPermssion: value })}
          onLocationChanged={value => this.setState({ location: value })}
        />
      );
    }
    return (
      <Explore
        location={location}
      />
    );
  }
}
