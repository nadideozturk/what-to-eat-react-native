import React, { Component } from 'react';
import { ScrollView, FlatList, StyleSheet, View, Image, AsyncStorage, Button as NativeButton, Platform } from 'react-native';
import { Container, Content, Card, CardItem, Text, Left, Button, Icon, Body, Right, Spinner } from 'native-base';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import axios from 'axios';
import * as GridHelper from '../helpers/GridHelpers';
import CardContent from '../components/OutsideCardContent';
import MockMeals from '../OutsideMealsMockData.json';


const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={IonIcon} iconSize={32} color="black" />
);

export default class OutsideMealsScreen extends Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      meals: undefined,
    };
  }

  async componentDidMount() {
    axios.get(
      'http://ec2-13-58-5-77.us-east-2.compute.amazonaws.com:8080/outsidemeals',
      {
        headers:{
          Authorization: await AsyncStorage.getItem('idToken')
        }
      }
    )
    .then(response => {
      this.setState({
        meals: response.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    if (typeof this.state.meals === 'undefined') {
      return (
        <Container>
          <Content>
            <Spinner color='red' />
          </Content>
        </Container>
      );
    }
    if (this.state.meals.length === 0) {
      return (
        <Container>
          <Content>
            <Text>Hic yemek yok yemek yap lo!</Text>
          </Content>
        </Container>
      );
    }
    const items = this.state.meals.map(meal =>
      <Card key={meal.id}>
        <CardItem cardBody>
          <Image
            style={{ flex: 1, width: null, height: 200 }}
            source={{ uri: meal.photoUrl }}
          />
        </CardItem>
        <CardItem>
          <Body>
            <Text>{`${meal.name} @ ${meal.restaurantName}`}</Text>
          </Body>
        </CardItem>
      </Card>);

    return (
      <Container>
        <Content>
          {GridHelper.renderGrid(GridHelper.itemsToGridArray(items))}
        </Content>
      </Container>
    );
  }
}

OutsideMealsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Outside Meals',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      <Item
        title="+"
        iconName={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
        onPress={() => navigation.navigate('NewOutsideMeal')}
      />
    </HeaderButtons>
  ),
});
