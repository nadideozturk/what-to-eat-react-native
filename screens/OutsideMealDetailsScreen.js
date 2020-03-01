import React from 'react';
import { connect } from 'react-redux';
import { Container, Content, Root } from 'native-base';
import OutsideMealDetailCard from '../components/OutsideMealDetailCard';
import { navigationShape, outsideMealWithMetadataShape } from '../constants/Shapes';

class OutsideMealDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Outside Post',
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
  mealWithMetadata: outsideMealWithMetadataShape.isRequired,
};

const mapStateToProps = state => ({
  mealWithMetadata: state.currentOutsideMeal,
});

export default connect(mapStateToProps)(OutsideMealDetailsScreen);
