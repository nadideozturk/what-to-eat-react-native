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
import * as GridHelper from '../helpers/GridHelpers';
import { navigationShape, outsideMealListWithMetadataShape } from '../constants/Shapes';
import * as OutsideMealActions from '../actionCreators/OutsideMealActions';

const defaultMealImageUrl = 'https://res.cloudinary.com/dv0qmj6vt/image/upload/v1571892846/hbc79s2xpvxnxsbnsbwe.jpg';
const IoniconsHeaderButton = (passMeFurther) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <HeaderButton {...passMeFurther} IconComponent={IonIcon} iconSize={32} color="black" />
);

class OutsideMealsScreen extends React.PureComponent {
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
    const items = meals.map((meal) => (
      <Card key={meal.id}>
        <CardItem
          cardBody
          button
          onPress={() => {
            dispatch(OutsideMealActions.setCurrentOutsideMeal(meal));
            navigation.navigate('OutsideMealDetails');
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
            dispatch(OutsideMealActions.setCurrentOutsideMeal(meal));
            navigation.navigate('OutsideMealDetails');
          }}
        >
          <Body>
            <Text>{`${meal.name} @ ${meal.restaurantName}`}</Text>
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

const mapStateToProps = (state) => ({
  mealsWithMetadata: state.outsideMealList,
});

export default connect(mapStateToProps)(OutsideMealsScreen);
