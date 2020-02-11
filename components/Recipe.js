import React from 'react';
import {
  CardItem,
  Text,
  Button,
  Icon,
  Body,
} from 'native-base';

export default class Recipe extends React.Component {
  constructor(state, props) {
    super(state, props);
    this.state = {
      isClicked: false,
    };
    this.meal = this.props;
  }

  render() {
    const { isClicked } = this.state;
    const { meal } = this.meal;
    if (!isClicked) {
      return (
        <CardItem>
          <Body>
            <Button
              iconLeft
              bordered
              block
              dark
              onPress={() => this.setState({ isClicked: true })}
            >
              <Icon name="book" />
              <Text>RECIPE</Text>
            </Button>
          </Body>
        </CardItem>
      );
    }
    return (
      <CardItem>
        <Body>
          <Text>
            {meal.recipe}
          </Text>
        </Body>
      </CardItem>
    );
  }
}
