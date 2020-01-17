import React from 'react';
import {
  Container,
  Header,
  Content,
  Text,
  Icon,
  Card,
  CardItem,
  Body,
  Button,
  StyleProvider,
} from 'native-base';
import { Linking } from 'expo';
import getTheme from '../native-base-theme/components';

export default class CameraRollPermissionRequestScreen extends React.Component {
  static navigationOptions = {
    title: 'Library',
  }

  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container>
          <Header />
          <Content padder>
            <Card>
              <CardItem header>
                <Text style={{ fontSize: 40, paddingRight: 5 }}>🙈</Text>
                <Text>Please Allow Access to Your Photos</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
  This allows WhatToEat to share photos from your library and save photos to your camera roll.
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Button iconLeft block onPress={() => Linking.openURL('app-settings:')}>
                    <Icon name="cog" />
                    <Text>Allow</Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
