import React from 'react';
import { AsyncStorage, Image,} from 'react-native';
import { Container, Header, H3, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class OutsideMealDetailCard extends React.Component {
  render() {
    const meal = this.props.meal;
    
    return (
      <Card>
        <CardItem>
          <Left>
            <Body>
              <Text><H3>{meal.name}</H3></Text>
              <Text>{meal.restaurantName}</Text>
            </Body>
          </Left>
          <Right>
            <Body>
              <Text note>{meal.lastEatenDate}</Text>
            </Body>
          </Right>
        </CardItem>
        <CardItem cardBody>
          <Image source={{uri: meal.photoUrl}} style={{height: 350, width: null, flex: 1}}/>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="chatbubbles" />
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
    );
  }
}
