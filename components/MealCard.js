import React from 'react';
import PropTypes from 'prop-types';
import { Text, Card, CardItem, Body } from 'native-base';
import Image from './Image';
import { mealShape } from '../constants/Shapes';
import { getMealImageSourceWithDeafult } from '../constants/config/Defaults';

export default class MealCard extends React.PureComponent {
  render() {
    const { meal, onPress } = this.props;
    const mealText = meal.restaurantName
      ? `${meal.name} @ ${meal.restaurantName}`
      : `${meal.name}`;

    return (
      <Card>
        <CardItem
          cardBody
          button
          onPress={onPress}
        >
          <Image
            style={{ flex: 1, width: 200, height: 200 }}
            source={getMealImageSourceWithDeafult(meal)}
          />
        </CardItem>
        <CardItem
          button
          onPress={onPress}
          style={{ height: '100%', paddingTop: 5, paddingBottom: 0, paddingLeft: 10, paddingRight: 5 }}
        >
          <Body>
            <Text style={{ fontSize: 15 }}>
              {mealText}
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

MealCard.propTypes = {
  meal: mealShape.isRequired,
  onPress: PropTypes.func.isRequired,
};
