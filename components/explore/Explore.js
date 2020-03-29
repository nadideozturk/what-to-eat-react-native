import React from 'react';
import { Content, Container, Header, Item, Icon, Input, Button, Text } from 'native-base';

export default class Explore extends React.PureComponent {
  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content padder>
          <Text>
            Meals here
          </Text>
        </Content>
      </Container>
    );
  }
}
