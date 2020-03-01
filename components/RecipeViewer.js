import React from 'react';
import {
  CardItem,
  Text,
  Button,
  Icon,
  Body,
} from 'native-base';
import { mealShape } from '../constants/Shapes';

export default class RecipeViewer extends React.Component {
  constructor(state, props) {
    super(state, props);
    this.state = {
      isClicked: false,
    };
  }

  render() {
    const { meal } = this.props;
    const { isClicked } = this.state;

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
            {meal.recipe || 'No recipe yet! You can edit to add a recipe.'}
          </Text>
        </Body>
      </CardItem>
    );
  }
}

RecipeViewer.propTypes = {
  meal: mealShape.isRequired,
};
