import React from 'react';
import { Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
  Badge,
} from 'native-base';
import { mealShape, navigationShape } from '../constants/Shapes';
import Recipe from './Recipe';
import * as HomemadeMealActions from '../actionCreators/HomemadeMealActions';

const defaultMealImageUrl = 'https://res.cloudinary.com/dv0qmj6vt/image/upload/v1571892846/hbc79s2xpvxnxsbnsbwe.jpg';
const BUTTONS = ['Delete', 'Edit', 'Cancel'];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 2;


class HomemadeMealDetailCard extends React.PureComponent {
  render() {
    const { meal, navigation, dispatch } = this.props;
    const tags = meal.tags.map((item) => (
      <Badge warning key={item.id}>
        <Text>
          {item.tagName}
        </Text>
      </Badge>
    ));

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
              <Text note>11 hour ago </Text>
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
                            HomemadeMealActions.deleteHomemadeMeal({
                              dispatch,
                              mealId: meal.id,
                              successHandler: () => { navigation.goBack(); },
                            });
                          },
                        },
                      ],
                      { cancelable: false },
                    );
                  } else if (buttonIndex === 1) {
                    // go to edit screen
                    navigation.navigate('EditHomemadeMeal', { meal });
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
        <CardItem style={{ paddingBottom: 0 }}>
          <Text>Tags  </Text>
          {tags}
        </CardItem>
        <Recipe
          meal={meal}
        />
      </Card>
    );
  }
}

HomemadeMealDetailCard.propTypes = {
  meal: mealShape.isRequired,
  navigation: navigationShape.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(HomemadeMealDetailCard);
