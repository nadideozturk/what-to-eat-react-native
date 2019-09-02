import React, { Component } from 'react';
import { ScrollView, FlatList, StyleSheet, View, Image, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Text, Left, Button, Icon, Body, Right, Spinner } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import axios from 'axios';
import * as GridHelper from '../helpers/GridHelpers';
import CardContent from '../components/OutsideCardContent';
import MockMeals from '../OutsideMealsMockData.json';

export default class HomemadeMealsScreen extends Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      meals: undefined,
    };
  }

  //Resize the grid
  onLayout = (event) => {
    const {width} = event.nativeEvent.layout;
    const itemWidth = 150;
    const numColumns = Math.floor(width/itemWidth);
    this.setState({ numColumns: numColumns });
  }

  async componentDidMount() {
    axios.get(
      'http://ec2-13-58-5-77.us-east-2.compute.amazonaws.com:8080/homemademeals',
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
            <Text>{`${meal.name}`}</Text>
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

HomemadeMealsScreen.navigationOptions = {
  title: 'Homemade Meals',
};
