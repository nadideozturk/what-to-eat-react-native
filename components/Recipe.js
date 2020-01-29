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
  }

  render() {
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
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Body>
      </CardItem>
    );
  }
}
