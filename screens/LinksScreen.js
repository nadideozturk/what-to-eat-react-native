import React, { Component } from 'react';
import { ScrollView, FlatList, StyleSheet, View, Image } from 'react-native';
import { Container, Content, Card, CardItem, Text, Left, Button, Icon, Body, Right } from 'native-base';
import CardContent from '../components/OutsideCardContent';
import MockMeals from '../OutsideMealsMockData.json';

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
    return (
      <Container>
        <Content>
          {
            this.state.meals.map(meal =>
              <Card key={meal.id}>
                <CardItem>
                  <Left>
                    <Body>
                      <Text>{meal.name}</Text>
                      <Text note>{meal.restaurantName}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    style={{ flex: 1, width: null, height: 200 }}
                    source={{ uri: meal.photoUrl }}
                  />
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon active name="thumbs-up" />
                      <Text>12 Likes</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      <Icon active name="chatbubbles" />
                      <Text>4 Comments</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Text>11h ago</Text>
                  </Right>
                </CardItem>
              </Card>
            )
          }
        </Content>
      </Container>
    );
  }
}

LinksScreen.navigationOptions = {
  title: 'Outside Meals',
};
