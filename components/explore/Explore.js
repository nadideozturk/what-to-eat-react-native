import React from 'react';
import PropTypes from 'prop-types';
import { Content, Container, Header, Item, Icon, Input, Button, Text } from 'native-base';

export default class Explore extends React.PureComponent {
  render() {
    const { location } = this.props;

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
            {`Explore for ${JSON.stringify(location)}`}
          </Text>
        </Content>
      </Container>
    );
  }
}

Explore.propTypes = {
  location: PropTypes.object,
};
