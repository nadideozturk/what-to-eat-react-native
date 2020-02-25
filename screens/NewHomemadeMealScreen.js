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
import { Image, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import TagSelector from '../components/TagSelector';
import { navigationShape, tagListWithMetadataShape } from '../constants/Shapes';
import * as HomemadeMealActions from '../actionCreators/HomemadeMealActions';

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
    const { dispatch, navigation, tagListWithMetadata } = this.props;

    return (
      <Container>
        <Content
          contentContainerStyle={{ flex: 1 }}
        >
          <Formik
            initialValues={{
              mealName: '',
              photoUrl: '',
              imageFile: '',
              duration: '',
              recipe: '',
              tags: '',
            }}
            validate={() => {} /* TODO implement validation */}
            onSubmit={(values) => {
              // TODO consider if actions.setSubmitting() is necessary
              const meal = {
                name: values.mealName,
                catId: 'defaultCategory',
                durationInMinutes: values.duration,
                recipe: values.recipe,
                tags: values.tags,
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
              <Form style={{ flex: 1 }}>
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
                <TagSelector
                  style={{ zIndex: 2 }}
                  tagListWithMetadata={tagListWithMetadata}
                  selectedTags={values.tags || []}
                  onSelectTag={(tag) => {
                    console.log('onSelectTag');
                    console.log(tag);
                    const existingSelectedTags = values.tags || [];
                    const newSelectedTags = [...existingSelectedTags, tag];
                    handleChange('tags')(newSelectedTags);
                  }}
                />
                <Textarea
                  rowSpan={2}
                  bordered
                  placeholder="Recipe"
                  onBlur={handleBlur('recipe')}
                  onChangeText={handleChange('recipe')}
                  value={values.recipe}
                />
                <View style={{ zIndex: -1 }}>
                  {isSubmitting
                    ? (<Spinner color="red" />)
                    : (<Button onPress={handleSubmit}><Text>Create</Text></Button>)}
                </View>
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
  tagListWithMetadata: tagListWithMetadataShape.isRequired,
};

const mapStateToProps = (state) => ({
  tagListWithMetadata: state.tags,
});

export default connect(mapStateToProps)(NewHomemadeMealScreen);
