import React from 'react';
import { Container, Content, Root } from 'native-base';
import HomemadeMealDetailCard from '../components/HomemadeMealDetailCard';
import { navigationShape } from '../constants/Shapes';

export default class HomemadeMealDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Homemade Post',
  };

  render() {
    const { navigation } = this.props;
    const meal = navigation.getParam('meal', '');

    return (
      <Root>
        <Container
          style={{ marginTop: -5, marginLeft: -3, marginRight: -3 }}
        >
          <Content>
            <HomemadeMealDetailCard
              meal={meal}
              navigation={navigation}
            />
          </Content>
        </Container>
      </Root>
    );
  }
}

HomemadeMealDetailsScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
