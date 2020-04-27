import React from 'react';
import { Alert, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Thumbnail,
  ActionSheet,
} from 'native-base';
import { mealShape, navigationShape, userDetailsWithMetaDataShape } from '../constants/Shapes';
import { getMealImageSourceWithDeafult } from '../constants/config/Defaults';
import Image from './Image';
import RecipeViewer from './RecipeViewer';
import TagViewer from './TagViewer';
import * as HomemadeMealActions from '../actionCreators/HomemadeMealActions';

const BUTTONS = ['Delete', 'Edit', 'Cancel'];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 2;

class HomemadeMealDetailCard extends React.PureComponent {
  render() {
    const { meal, navigation, dispatch, userDetailsWithMetadata } = this.props;
    const userPhotoUrl = userDetailsWithMetadata.value.photoUrl;

    return (
      <Card>
        <CardItem style={{ justifyContent: 'space-between' }}>
          <Thumbnail
            small
            source={{ uri: userPhotoUrl }}
            style={{ marginLeft: -6, marginRight: 10 }}
          />
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text>{meal.name}</Text>
            </View>
            <Text note>11 hour ago </Text>
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
        </CardItem>
        <CardItem cardBody>
          <Image
            source={getMealImageSourceWithDeafult(meal)}
            style={{ height: 350, width: 400, flex: 1 }}
          />
        </CardItem>
        <CardItem style={{ paddingBottom: 0 }}>
          <TagViewer tags={meal.tags} />
        </CardItem>
        <RecipeViewer meal={meal} />
      </Card>
    );
  }
}

HomemadeMealDetailCard.propTypes = {
  meal: mealShape.isRequired,
  navigation: navigationShape.isRequired,
  dispatch: PropTypes.func.isRequired,
  userDetailsWithMetadata: userDetailsWithMetaDataShape.isRequired,
};

const mapStateToProps = state => ({
  userDetailsWithMetadata: state.userDetails,
});

export default connect(mapStateToProps)(HomemadeMealDetailCard);
