import React from 'react';
import { Container, Content, } from 'native-base';
import OutsideMealDetailCard from '../components/OutsideMealDetailCard';

export default class OutsideMealDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Detail',
  };

  render() {
    const { navigation } = this.props;
    const meal = navigation.getParam('meal', '');

    return (
      <Container>
        <Content>
          <OutsideMealDetailCard meal={meal} />
        </Content>
      </Container>
    );
  }
}
