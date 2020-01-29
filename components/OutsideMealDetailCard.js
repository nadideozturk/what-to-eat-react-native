import React from 'react';
import { Image } from 'react-native';
import {
  H3,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import { mealShape } from '../constants/Shapes';

export default class OutsideMealDetailCard extends React.PureComponent {
  render() {
    const { meal } = this.props;

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
              <Text note>Example last eaten date</Text>
            </Body>
          </Right>
        </CardItem>
        <CardItem cardBody>
          <Image source={{ uri: meal.photoUrl }} style={{ height: 350, width: null, flex: 1 }} />
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text>12</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text>4</Text>
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

OutsideMealDetailCard.propTypes = {
  meal: mealShape.isRequired,
};
