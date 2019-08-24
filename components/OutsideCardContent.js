import React from 'react';
import { View, Text, Image } from 'react-native';

export default class OutsideCardContent extends React.Component {
  render() {
    return (
      <View>
        <Image
            style={{width: 66, height: 58}}
            source={{ uri: this.props.meal.photoUrl }}
        />
        <Text>{this.props.meal.name}</Text>
      </View>
    );
  }
}
