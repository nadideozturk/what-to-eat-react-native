import React from 'react';
import { Image } from 'react-native';
import {
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
} from 'native-base';
import { mealShape } from '../constants/Shapes';

export default class HomemadeMealDetailCard extends React.PureComponent {
  render() {
    const { meal } = this.props;

    return (
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Left>
            <Body>
              <Text>{meal.name}</Text>
              <Text note>April 15, 2016</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Image source={{ uri: meal.photoUrl }} style={{ height: 200, width: 350, flex: 1 }} />
            <Text>
              Yemek Tarifi Yemek Tarifi Yemek Tarifi Yemek Tarifi Yemek Tarifi
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent textStyle={{ color: '#87838B' }}>
              <Icon name="logo-github" />
              <Text>1,926 stars</Text>
            </Button>
          </Left>
        </CardItem>
      </Card>
    );
  }
}

HomemadeMealDetailCard.propTypes = {
  meal: mealShape.isRequired,
};
