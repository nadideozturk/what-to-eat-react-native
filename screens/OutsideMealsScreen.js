import React, { Component } from 'react';
import { ScrollView, FlatList, StyleSheet, View, Image } from 'react-native';
import { Container, Content, Card, CardItem, Text, Left, Button, Icon, Body, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as GridHelper from '../helpers/GridHelpers';
import CardContent from '../components/OutsideCardContent';
import MockMeals from '../OutsideMealsMockData.json';

export default class OutsideMealsScreen extends Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      meals: MockMeals.outsideMeals,
    };
  }

  render() {
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

OutsideMealsScreen.navigationOptions = {
  title: 'Outside Meals',
};
