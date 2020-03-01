import React from 'react';
import { Image, Alert, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Thumbnail,
  ActionSheet,
} from 'native-base';
import { mealShape, navigationShape } from '../constants/Shapes';
import { getMealImageSourceWithDeafult } from '../constants/config/Defaults';
import * as OutsideMealActions from '../actionCreators/OutsideMealActions';
import TagViewer from './TagViewer';

const BUTTONS = ['Delete', 'Edit', 'Cancel'];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 2;

class OutsideMealDetailCard extends React.PureComponent {
  render() {
    const { meal, navigation, dispatch } = this.props;

    return (
      <Card>
        <CardItem style={{ justifyContent: 'space-between' }}>
          <Thumbnail
            small
            source={{ uri: 'https://lh3.googleusercontent.com/a-/AAuE7mBiYdQO-W32CcREhzqJ8tH1XfM_R7JPaktervK3' }}
            style={{ marginLeft: -6, marginRight: 10 }}
          />
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text>{meal.name}</Text>
            </View>
            <Text note>{meal.restaurantName}</Text>
          </View>
          <Button
            transparent
            onPress={() => ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
              },
              buttonIndex => {
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
                          OutsideMealActions.deleteOutsideMeal({
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
                  navigation.navigate('EditOutsideMeal', { meal });
                }
              },
            )}
          >
            <Icon name="ios-more" style={{ fontSize: 25, color: 'black' }} />
          </Button>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={getMealImageSourceWithDeafult(meal)}
            style={{ height: 350, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Left>
            <Text>11 hour ago</Text>
          </Left>
          <Right>
            <Text>
              {meal.price}
              {' '}
              CAD
            </Text>
          </Right>
        </CardItem>
        <CardItem>
          <TagViewer tags={meal.tags} />
        </CardItem>
      </Card>
    );
  }
}

OutsideMealDetailCard.propTypes = {
  meal: mealShape.isRequired,
  navigation: navigationShape.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(OutsideMealDetailCard);
