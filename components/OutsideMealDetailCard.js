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
  Right,
  Thumbnail,
} from 'native-base';
import { mealShape } from '../constants/Shapes';

export default class OutsideMealDetailCard extends React.PureComponent {
  render() {
    const { meal } = this.props;

    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail
              small
              source={{ uri: 'https://lh3.googleusercontent.com/a-/AAuE7mBiYdQO-W32CcREhzqJ8tH1XfM_R7JPaktervK3' }}
              style={{ marginLeft: -6 }}
            />
            <Body>
              <Text>{meal.name}</Text>
              <Text note>{meal.restaurantName}</Text>
            </Body>
          </Left>
          <Right>
            <Button transparent>
              <Icon name="ios-more" style={{ fontSize: 25, color: 'black' }} />
            </Button>
          </Right>
        </CardItem>
        <CardItem cardBody>
          <Image source={{ uri: meal.photoUrl }} style={{ height: 350, width: null, flex: 1 }} />
        </CardItem>
        <CardItem>
          <Left>
            <Text>11 hour ago</Text>
          </Left>
          <Right>
            <Text>
              {meal.price}
               CAD
            </Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

OutsideMealDetailCard.propTypes = {
  meal: mealShape.isRequired,
};
