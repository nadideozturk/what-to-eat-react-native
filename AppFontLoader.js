import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import PropTypes from 'prop-types';

export default class AppFontLoader extends React.Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        // eslint-disable-next-line global-require
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        // eslint-disable-next-line global-require
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log('error loading icon fonts', error);
    }
  }

  render() {
    const { fontLoaded } = this.state;
    const { children } = this.props;

    if (!fontLoaded) {
      return <AppLoading />;
    }
    return children;
  }
}

AppFontLoader.propTypes = {
  children: PropTypes.element.isRequired,
};
