import React from 'react';
import { Container, Content } from 'native-base';
import OutsideMealDetailCard from '../components/OutsideMealDetailCard';
import { navigationShape } from '../constants/Shapes';

export default class OutsideMealDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Detail',
  };

  render() {
    const { navigation } = this.props;
    const meal = navigation.getParam('meal', '');

    return (
      <Container
        style={{ marginTop: -5, marginLeft: -3, marginRight: -3 }}
      >
        <Content>
          <OutsideMealDetailCard meal={meal} />
        </Content>
      </Container>
    );
  }
}

OutsideMealDetailsScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
