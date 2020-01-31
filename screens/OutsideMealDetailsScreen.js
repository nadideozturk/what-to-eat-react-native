import React from 'react';
import { Container, Content, Root } from 'native-base';
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
      <Root>
        <Container
          style={{ marginTop: -5, marginLeft: -3, marginRight: -3 }}
        >
          <Content>
            <OutsideMealDetailCard
              meal={meal}
              navigation={navigation}
            />
          </Content>
        </Container>
      </Root>
    );
  }
}

OutsideMealDetailsScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
