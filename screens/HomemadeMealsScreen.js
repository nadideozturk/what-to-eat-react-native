import React from 'react';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import {
  Container,
  Content,
  Text,
  Spinner,
} from 'native-base';
import PropTypes from 'prop-types';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as HomemadeMealActions from '../actionCreators/HomemadeMealActions';
import * as TagActions from '../actionCreators/TagActions';
import * as GridHelper from '../helpers/GridHelpers';
import { navigationShape, homemadeMealListWithMetadataShape } from '../constants/Shapes';
import MealCard from '../components/MealCard';

const IoniconsHeaderButton = passMeFurther => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <HeaderButton {...passMeFurther} IconComponent={IonIcon} iconSize={32} color="black" />
);

class HomemadeMealsScreen extends React.PureComponent {
  async componentDidMount() {
    const { dispatch } = this.props;
    HomemadeMealActions.fetchHomemadeMealList(dispatch);
    TagActions.fetchTags(dispatch);

    const { navigation } = this.props;
    this.willFocusSubscription = navigation.addListener(
      'willFocus',
      () => {
        // TODO make sure this still works, e.g. when coming back from create use case
        HomemadeMealActions.fetchHomemadeMealList(dispatch);
      },
    );
  }

  render() {
    const { navigation, dispatch } = this.props;
    const { mealsWithMetadata } = this.props;

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

    if (meals.length === 0) {
      return (
        <Container>
          <Content>
            <Text>Hic yemek yok yemek yap lo!</Text>
          </Content>
        </Container>
      );
    }

    const mealCards = meals.map(meal => (
      <MealCard
        key={meal.id}
        meal={meal}
        onPress={() => {
          dispatch(HomemadeMealActions.setCurrentHomemadeMeal(meal));
          navigation.navigate('HomemadeMealDetails');
        }}
      />
    ));

    return (
      <Container>
        <Content>
          {GridHelper.renderGrid(GridHelper.itemsToGridArray(mealCards))}
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

HomemadeMealsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Homemade Meals',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      <Item
        title="+"
        iconName={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
        onPress={async () => {
          if (await getPermissionAsync()) {
            return navigation.navigate('NewHomemadeMeal');
          }
          return navigation.navigate('CameraRollPermission');
        }}
      />
    </HeaderButtons>
  ),
});

HomemadeMealsScreen.propTypes = {
  navigation: navigationShape.isRequired,
  dispatch: PropTypes.func.isRequired,
  mealsWithMetadata: homemadeMealListWithMetadataShape.isRequired,
};

const mapStateToProps = state => ({
  mealsWithMetadata: state.homemadeMealList,
});

export default connect(mapStateToProps)(HomemadeMealsScreen);
