import React, { Component } from 'react';
import { ScrollView, FlatList, StyleSheet, View, Image } from 'react-native';
import { Container, Content, Card, CardItem, Text, Left, Button, Icon, Body, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import CardContent from '../components/OutsideCardContent';
import MockMeals from '../OutsideMealsMockData.json';

const COLUMNS = 2;
const itemsToGridArray = (items, totalColumns) => {
  let gridArray = [[]];

  let countColumns = 1;
  for (var i = 0; i < items.length; i++) {
    gridArray[gridArray.length - 1].push(items[i]);
    if (countColumns <= totalColumns) {
      countColumns++;
    }
    if (countColumns > totalColumns && i !== items.length - 1) {
      countColumns = 1;
      gridArray.push([]);
    }
  }

  return gridArray;
}

const renderGrid = (gridArray) => {
  return gridArray.map(row => (
    <Row key={`row_${row[0].key}`}>
      {
        row.map(col => (
          <Col key={`col_${col.key}`}>
            {col}
          </Col>
        ))
      }
    </Row>
  ));
}

export default class LinksScreen extends Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      meals: MockMeals.outsideMeals,
    };
  }

  //Resize the grid
  onLayout = (event) => {
    const {width} = event.nativeEvent.layout;
    const itemWidth = 150;
    const numColumns = Math.floor(width/itemWidth);
    this.setState({ numColumns: numColumns });
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
          {renderGrid(itemsToGridArray(items, COLUMNS))}
        </Content>
      </Container>
    );
  }
}

LinksScreen.navigationOptions = {
  title: 'Outside Meals',
};
