import React from 'react';
import { View, Text, Image } from 'react-native';
import { mealShape } from '../constants/Shapes';

export default class OutsideCardContent extends React.PureComponent {
  render() {
    const { meal } = this.props;

    return (
      <View>
        <Image
          style={{ width: 66, height: 58 }}
          source={{ uri: meal.photoUrl }}
        />
        <Text>{meal.name}</Text>
      </View>
    );
  }
}

OutsideCardContent.propTypes = {
  meal: mealShape.isRequired,
};
