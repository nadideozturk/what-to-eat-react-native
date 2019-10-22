import React from 'react';
import { Container, Header, Content } from 'native-base';
import HomemadeMealDetailCard from '../components/HomemadeMealDetailCard';
import { navigationShape } from '../constants/Shapes';

export default class HomemadeMealDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Detail',
  };

  render() {
    const { navigation } = this.props;
    const meal = navigation.getParam('meal', '');

    return (
      <Container>
        <Header />
        <Content>
          <HomemadeMealDetailCard meal={meal} />
        </Content>
      </Container>
    );
  }
}

HomemadeMealDetailsScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
