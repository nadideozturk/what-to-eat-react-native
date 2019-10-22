import React, { Component } from 'react';
import {
  Image,
  AsyncStorage,
  Platform,
} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Spinner,
} from 'native-base';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import axios from 'axios';
import * as GridHelper from '../helpers/GridHelpers';
import { navigationShape } from '../constants/Shapes';

const IoniconsHeaderButton = (passMeFurther) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <HeaderButton {...passMeFurther} IconComponent={IonIcon} iconSize={32} color="black" />
);

export default class HomemadeMealsScreen extends Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      meals: undefined,
    };
  }

  async componentDidMount() {
    axios.get(
      'http://ec2-13-58-5-77.us-east-2.compute.amazonaws.com:8080/homemademeals',
      {
        headers: {
          Authorization: await AsyncStorage.getItem('idToken'),
        },
      },
    )
      .then((response) => {
        this.setState({
          meals: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { meals } = this.state;
    const { navigation } = this.props;

    if (typeof meals === 'undefined') {
      return (
        <Container>
          <Content>
            <Spinner color="red" />
          </Content>
        </Container>
      );
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
          onPress={() => navigation.navigate(
            'HomemadeMealDetails', {
              meal,
            },
          )}
        >
          <Image
            style={{ flex: 1, width: null, height: 200 }}
            source={{ uri: meal.photoUrl }}
          />
        </CardItem>
        <CardItem
          button
          onPress={() => navigation.navigate(
            'HomemadeMealDetails', {
              meal,
            },
          )}
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

HomemadeMealsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Homemade Meals',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      <Item
        title="+"
        iconName={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
        onPress={() => navigation.navigate('NewHomemadeMeal')}
      />
    </HeaderButtons>
  ),
});

HomemadeMealsScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
