import React from 'react';
import { Image, Alert, AsyncStorage } from 'react-native';
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
  ActionSheet,
} from 'native-base';
import axios from 'axios';
import { mealShape, navigationShape } from '../constants/Shapes';
import Recipe from './Recipe';

const deleteHomemadeMeal = async (mealId) => (
  axios.delete(
    `http://ec2-13-58-5-77.us-east-2.compute.amazonaws.com:8080/homemademeals/${mealId}`,
    {
      headers: {
        Authorization: await AsyncStorage.getItem('idToken'),
      },
    },
  )
);

const defaultMealImageUrl = 'https://res.cloudinary.com/dv0qmj6vt/image/upload/v1571892846/hbc79s2xpvxnxsbnsbwe.jpg';
const BUTTONS = ['Delete', 'Edit', 'Cancel'];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 2;

export default class HomemadeMealDetailCard extends React.PureComponent {
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
              <Text note>11 hour ago</Text>
            </Body>
          </Left>
          <Right>
            <Button
              transparent
              onPress={() => ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX,
                },
                (buttonIndex) => {
                  // TODO make sure multiple clicks are prevented while waiting the backend response
                  // this.setState({ clicked: BUTTONS[buttonIndex] });
                  if (buttonIndex === 0) {
                    Alert.alert(
                      'Delete Post',
                      'It will be permanently deleted',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'Delete',
                          onPress: async () => {
                            try {
                              await deleteHomemadeMeal(meal.id);
                            } catch (e) {
                              console.log('Unsuccessful deleted.', e);
                            }
                            // alert('Deleted Successfully');
                            const { navigation } = this.props;
                            navigation.goBack();
                          },
                        },
                      ],
                      { cancelable: false },
                    );
                  }
                },
              )}
            >
              <Icon name="ios-more" style={{ fontSize: 25, color: 'black' }} />
            </Button>
          </Right>
        </CardItem>
        <CardItem cardBody>
          <Image source={{ uri: meal.photoUrl || defaultMealImageUrl }} style={{ height: 350, width: null, flex: 1 }} />
        </CardItem>
        <Recipe />
      </Card>
    );
  }
}

HomemadeMealDetailCard.propTypes = {
  meal: mealShape.isRequired,
  navigation: navigationShape.isRequired,
};
