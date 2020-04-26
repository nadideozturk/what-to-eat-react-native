import React from 'react';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import {
  Container,
  Content,
  Text,
} from 'native-base';
import PropTypes from 'prop-types';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as GridHelper from '../helpers/GridHelpers';
import { navigationShape, outsideMealListWithMetadataShape } from '../constants/Shapes';
import MealCard from '../components/MealCard';
import SearchBox from '../components/SearchBox';
import Spinner from '../components/Spinner';
import * as OutsideMealActions from '../actionCreators/OutsideMealActions';
import { filterOutsideMealsByName } from '../utils/MealFilter';

const IoniconsHeaderButton = passMeFurther => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <HeaderButton {...passMeFurther} IconComponent={IonIcon} iconSize={32} color="black" />
);

class OutsideMealsScreen extends React.PureComponent {
  constructor(props, state) {
    super(props, state);
    this.state = {
      searchQuery: undefined,
    };
  }

  async componentDidMount() {
    const { navigation, dispatch } = this.props;
    OutsideMealActions.fetchOutsideMealList(dispatch);
    this.willFocusSubscription = navigation.addListener(
      'willFocus',
      () => {
        OutsideMealActions.fetchOutsideMealList(dispatch);
      },
    );
  }

  render() {
    const { navigation, dispatch, mealsWithMetadata } = this.props;
    const { searchQuery } = this.state;

    if (mealsWithMetadata.loading) {
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

    const meals = mealsWithMetadata.value;
    if (typeof (meals) === 'undefined') {
      return null;
    }

    const filteredMeals = filterOutsideMealsByName(meals, searchQuery);
    const mealCards = filteredMeals.map(meal => (
      <MealCard
        key={meal.id}
        meal={meal}
        onPress={() => {
          dispatch(OutsideMealActions.setCurrentOutsideMeal(meal));
          navigation.navigate('OutsideMealDetails');
        }}
      />
    ));

    return (
      <Container>
        <Content>
          <SearchBox
            onChangeText={value => this.setState({ searchQuery: value })}
          />
          { filteredMeals.length
            ? GridHelper.renderGrid(GridHelper.itemsToGridArray(mealCards))
            : (<Text>No meals found!</Text>)}
        </Content>
      </Container>
    );
  }
}

const getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      return false;
    }
  }
  return true;
};

OutsideMealsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Outside Meals',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      <Item
        title="+"
        iconName={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
        onPress={async () => {
          if (await getPermissionAsync()) {
            return navigation.navigate('NewOutsideMeal');
          }
          return navigation.navigate('CameraRollPermissionOut');
        }}
      />
    </HeaderButtons>
  ),
});

OutsideMealsScreen.propTypes = {
  navigation: navigationShape.isRequired,
  dispatch: PropTypes.func.isRequired,
  mealsWithMetadata: outsideMealListWithMetadataShape.isRequired,
};

const mapStateToProps = state => ({
  mealsWithMetadata: state.outsideMealList,
});

export default connect(mapStateToProps)(OutsideMealsScreen);
