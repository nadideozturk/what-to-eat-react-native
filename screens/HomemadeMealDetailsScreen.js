import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, Root } from 'native-base';
import HomemadeMealDetailCard from '../components/HomemadeMealDetailCard';
import { navigationShape, homemadeMealWithMetadataShape } from '../constants/Shapes';

class HomemadeMealDetailsScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Homemade Post',
  };

  render() {
    const { navigation, mealWithMetadata } = this.props;
    const meal = mealWithMetadata.value;

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
  mealWithMetadata: homemadeMealWithMetadataShape.isRequired,
};

const mapStateToProps = state => ({
  mealWithMetadata: state.currentHomemadeMeal,
});

export default connect(mapStateToProps)(HomemadeMealDetailsScreen);
