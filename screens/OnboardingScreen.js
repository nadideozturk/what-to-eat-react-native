import React from 'react';
import { AsyncStorage, StyleSheet, Button, View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import Onboarding from 'react-native-onboarding-swiper';
import Spinner from '../components/Spinner';
import Image from '../components/Image';
import { navigationShape } from '../constants/Shapes';

const style = StyleSheet.create({
  onboardingImage: {
    width: 200,
    height: 200,
  },
});

export default class OnboardingScreen extends React.Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      skipOnboarding: undefined,
    };
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const skipOnboarding = await AsyncStorage.getItem('skipOnboarding');
    this.setState({ skipOnboarding });
    if (skipOnboarding) {
      const { navigation } = this.props;
      navigation.navigate('AuthLoading');
    }
  };

  render() {
    const { navigation } = this.props;
    const { skipOnboarding } = this.state;

    if (typeof (skipOnboarding) === 'undefined') {
      return (
        <Container>
          <Content
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
          >
            <Spinner />
          </Content>
        </Container>
      );
    }

    return (
      <Onboarding
        onDone={() => {
          AsyncStorage.setItem('skipOnboarding', 'true');
          navigation.navigate('AuthLoading');
        }}
        showSkip={false}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image
                style={style.onboardingImage}
                source={require('../assets/images/cook-active.png')}
              />),
            title: 'Homemade meals',
            subtitle: 'Build a collection of meals you like to cook!',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                style={style.onboardingImage}
                source={require('../assets/images/order-active.png')}
              />),
            title: 'Outside meals',
            subtitle: 'Build a collection of meals you like to order!',
          },
        ]}
      />
    );
  }
}

OnboardingScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
