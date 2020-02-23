import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Spinner,
  Textarea,
} from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import Autocomplete from 'react-native-autocomplete-input';
import { navigationShape } from '../constants/Shapes';
import * as HomemadeMealActions from '../actionCreators/HomemadeMealActions';

const allTags = [
  { id: '1', tagName: 'dessert' },
  { id: '2', tagName: 'soup' },
  { id: '3', tagName: 'sour' },
  { id: '4', tagName: 'test test' },
  { id: '5', tagName: 'test2' },
  { id: '6', tagName: 'test3' },
  { id: '7', tagName: 'test4' },
  { id: '8', tagName: 'test5' },
];

const filterTags = (userInput) => {
  if (!userInput) {
    return [];
  }
  const userInputLower = userInput.toLowerCase();
  return allTags.filter((t) => t.tagName.startsWith(userInputLower));
};

const imagePickerOptions = {
  // TODO test video
  allowsEditing: true,
  aspect: [1, 1],
  // TODO quality
};

class NewHomemadeMealScreen extends React.Component {
  constructor(props, state) {
    super(props, state);
    this.imagePickerButtonRef = React.createRef();
    this.firstInputRef = React.createRef();
    this.state = {
      tagsQuery: undefined,
    };
  }

  async componentDidMount() {
    if (this.imagePickerButtonRef.current) {
      // this.imagePickerButtonRef.current.touchableHandlePress();
    }
  }

  static navigationOptions = {
    title: 'New Homemade Meal ',
  };

  render() {
    const { dispatch, navigation } = this.props;
    const { tagsQuery } = this.state;

    return (
      <Container>
        <Content>
          <Formik
            initialValues={{
              mealName: '',
              photoUrl: '',
              imageFile: '',
              duration: '',
              recipe: '',
            }}
            validate={() => {} /* TODO implement validation */}
            onSubmit={(values) => {
              // TODO consider if actions.setSubmitting() is necessary
              const meal = {
                name: values.mealName,
                catId: 'defaultCategory',
                durationInMinutes: values.duration,
                recipe: values.recipe,
              };
              HomemadeMealActions.createHomemadeMeal({
                dispatch,
                imageFile: values.imageFile,
                meal,
                successHandler: () => { navigation.goBack(); },
              });
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <Form>
                <Item>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-start',
                      paddingRight: 7,
                      paddingLeft: 7,
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                    ref={this.imagePickerButtonRef}
                    onPress={async () => {
                      const response = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);
                      if (response.cancelled) {
                        console.log('cancelled');
                        return;
                      }
                      handleChange('imageFile')(response);
                      if (this.firstInputRef.current) {
                        // eslint-disable-next-line
                        this.firstInputRef.current._root._inputRef.focus();
                      }
                    }}
                  >
                    {values.imageFile
                      ? (
                        <Image
                          source={{ uri: values.imageFile.uri }}
                          style={{ height: 60, width: 60 }}
                        />
                      )
                      : null}
                  </TouchableOpacity>
                  <Input
                    ref={this.firstInputRef}
                    placeholder="Meal name"
                    onBlur={handleBlur('mealName')}
                    onChangeText={handleChange('mealName')}
                    style={{ alignSelf: 'flex-start' }}
                    value={values.mealName}
                  />
                </Item>
                <Item>
                  <Input
                    placeholder="Duration"
                    onBlur={handleBlur('duration')}
                    onChangeText={handleChange('duration')}
                    value={values.duration}
                  />
                </Item>
                <Item style={{
                  zIndex: 2,
                }}
                >
                  <Text>Tags </Text>
                  <Autocomplete
                    data={filterTags(tagsQuery)}
                    defaultValue={null}
                    onChangeText={(text) => this.setState({ tagsQuery: text })}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => console.log(`selected: ${JSON.stringify(item)}`)}
                      >
                        <Text>{item.tagName}</Text>
                      </TouchableOpacity>
                    )}
                    containerStyle={{
                      width: '90%',
                      paddingTop: 10,
                      paddingRight: 20,
                      paddingBottom: 10,
                      paddingLeft: 10,
                    }}
                    listStyle={{ zIndex: 1, position: 'absolute' }}
                  />
                </Item>
                <Textarea
                  rowSpan={5}
                  bordered
                  placeholder="Recipe"
                  onBlur={handleBlur('recipe')}
                  onChangeText={handleChange('recipe')}
                  value={values.recipe}
                />
                {isSubmitting
                  ? (<Spinner color="red" />)
                  : (<Button onPress={handleSubmit}><Text>Create</Text></Button>)}
              </Form>
            )}
          </Formik>
        </Content>
      </Container>
    );
  }
}

NewHomemadeMealScreen.propTypes = {
  navigation: navigationShape.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(NewHomemadeMealScreen);
