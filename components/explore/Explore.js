import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Content, Container, Text, Spinner, Tabs, Tab } from 'native-base';
import * as ExploreActions from '../../actionCreators/ExploreActions';
import {
  homemadeMealListWithMetadataShape,
  outsideMealListWithMetadataShape,
  navigationShape,
} from '../../constants/Shapes';
import MealCard from '../MealCard';
import * as GridHelper from '../../helpers/GridHelpers';
import { filterMealsByName } from '../../utils/MealFilter';

const getTabContent = mealsWithMetadata => {
  if (mealsWithMetadata.loading) {
    return (
      <Container>
        <Content
          contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
          <Spinner color="red" />
        </Content>
      </Container>
    );
  }

  const meals = mealsWithMetadata.value;
  if (typeof (meals) === 'undefined') {
    return null;
  }

  const filteredMeals = filterMealsByName(meals, ''/* TODO searchquery */);
  const mealCards = filteredMeals.map(meal => (
    <MealCard
      key={meal.id}
      meal={meal}
      onPress={() => {
        alert('meal show');
        // dispatch(HomemadeMealActions.setCurrentHomemadeMeal(meal));
        // navigation.navigate('HomemadeMealDetails');
      }}
    />
  ));

  return (
    <Container>
      <Content>
        {
          /*
          <SearchBox
            onChangeText={value => this.setState({ searchQuery: value })}
          />
          */
        }
        { filteredMeals.length
          ? GridHelper.renderGrid(GridHelper.itemsToGridArray(mealCards))
          : (<Text>No meals found!</Text>)}
      </Content>
    </Container>
  );
};

class Explore extends React.PureComponent {
  async componentDidMount() {
    const { dispatch } = this.props;
    const { navigation } = this.props;
    this.willFocusSubscription = navigation.addListener(
      'willFocus',
      () => {
        ExploreActions.fetchHomemadeMealList(dispatch);
        ExploreActions.fetchOutsideMealList(dispatch);
      },
    );
  }

  render() {
    const { homemadeMealsWithMetadata, outsideMealsWithMetadata } = this.props;
    // const { searchQuery } = this.state;

    return (
      <Tabs>
        <Tab heading="Homemade">
          {getTabContent(homemadeMealsWithMetadata)}
        </Tab>
        <Tab heading="Outside">
          {getTabContent(outsideMealsWithMetadata)}
        </Tab>
      </Tabs>
    );
  }
}

Explore.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: navigationShape.isRequired,
  homemadeMealsWithMetadata: homemadeMealListWithMetadataShape.isRequired,
  outsideMealsWithMetadata: outsideMealListWithMetadataShape.isRequired,
};

const mapStateToProps = state => ({
  homemadeMealsWithMetadata: state.exploreHomemadeMealList,
  outsideMealsWithMetadata: state.exploreOutsideMealList,
});

export default connect(mapStateToProps)(Explore);
