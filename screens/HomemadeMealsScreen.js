import React from 'react';
import { connect } from 'react-redux';
import { Image, Platform } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Spinner,
} from 'native-base';
import PropTypes from 'prop-types';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as HomemadeMealActions from '../actionCreators/HomemadeMealActions';
import * as GridHelper from '../helpers/GridHelpers';
import { navigationShape, homemadeMealListWithMetadataShape } from '../constants/Shapes';

const defaultMealImageUrl = 'https://res.cloudinary.com/dv0qmj6vt/image/upload/v1571892846/hbc79s2xpvxnxsbnsbwe.jpg';

const IoniconsHeaderButton = (passMeFurther) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <HeaderButton {...passMeFurther} IconComponent={IonIcon} iconSize={32} color="black" />
);

class HomemadeMealsScreen extends React.PureComponent {
  async componentDidMount() {
    const { dispatch } = this.props;
    HomemadeMealActions.fetchHomemadeMealList(dispatch);

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
          <Content>
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
    const items = meals.map((meal) => (
      <Card key={meal.id}>
        <CardItem
          cardBody
          button
          onPress={() => {
            dispatch(HomemadeMealActions.setCurrentHomemadeMeal(meal));
            navigation.navigate('HomemadeMealDetails');
          }}
        >
          <Image
            style={{ flex: 1, width: null, height: 200 }}
            source={{ uri: meal.photoUrl || defaultMealImageUrl }}
          />
        </CardItem>
        <CardItem
          button
          onPress={() => {
            dispatch(HomemadeMealActions.setCurrentHomemadeMeal(meal));
            navigation.navigate('HomemadeMealDetails');
          }}
        >
          <Body>
            <Text>{`${meal.name}`}</Text>
          </Body>
        </CardItem>
      </Card>
    ));

    return (
      <Container>
        <Content>
          {GridHelper.renderGrid(GridHelper.itemsToGridArray(items))}
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

const mapStateToProps = (state) => ({
  mealsWithMetadata: state.homemadeMealList,
});

export default connect(mapStateToProps)(HomemadeMealsScreen);
