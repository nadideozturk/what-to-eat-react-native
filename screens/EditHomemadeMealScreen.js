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
  Label,
} from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { navigationShape } from '../constants/Shapes';
import NumericInput from '../components/NumericInput';
import * as HomemadeMealActions from '../actionCreators/HomemadeMealActions';

const imagePickerOptions = {
  // todo test video
  allowsEditing: true,
  aspect: [1, 1],
  // quality
};

class EditHomemadeMealScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit',
  };

  render() {
    const { navigation, dispatch } = this.props;
    const meal = navigation.getParam('meal', '');

    return (
      <Container>
        <Content>
          <Formik
            initialValues={{
              mealName: meal.name,
              photoUrl: meal.photoUrl,
              imageFile: meal.imageFile,
              durationInMinutes: meal.durationInMinutes ? String(meal.durationInMinutes) : '',
              recipe: meal.recipe,
            }}
            validate={() => {} /* TODO implement validation */}
            onSubmit={async (values) => {
              // TODO consider if actions.setSubmitting() is necessary
              const updatedMeal = {
                ...meal,
                name: values.mealName,
                catId: 'defaultCategory',
                durationInMinutes: Number(values.durationInMinutes),
                recipe: values.recipe,
                photoContent: 'Empty',
              };
              HomemadeMealActions.updateHomemadeMeal({
                dispatch,
                imageFile: values.imageFile,
                meal: updatedMeal,
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
              <Form
                style={{
                  paddingRight: 10,
                }}
              >
                <Item>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-start',
                      paddingRight: 7,
                      paddingLeft: 7,
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                    onPress={async () => {
                      const response = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);
                      if (response.cancelled) {
                        console.log('cancelled');
                        return;
                      }
                      handleChange('imageFile')(response);
                    }}
                  >
                    {values.imageFile
                      ? (
                        <Image
                          source={{ uri: values.imageFile.uri }}
                          style={{ height: 60, width: 60 }}
                        />
                      )
                      : (
                        <Image
                          source={{ uri: meal.photoUrl }}
                          style={{ height: 60, width: 60 }}
                        />
                      )}
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
                  <Item inlineLabel>
                    <Label>Duration</Label>
                    <NumericInput
                      onBlur={handleBlur('durationInMinutes')}
                      onChangeText={handleChange('durationInMinutes')}
                      value={values.durationInMinutes}
                      placeholder=""
                    />
                  </Item>
                </Item>
                <Label style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 20,
                }}
                >
                  Recipe
                </Label>
                <Item
                  style={{
                    paddingBottom: 10,
                  }}
                >
                  <Textarea
                    rowSpan={8}
                    bordered
                    placeholder="Enter recipe (optional)"
                    onBlur={handleBlur('recipe')}
                    onChangeText={handleChange('recipe')}
                    value={values.recipe}
                    style={{
                      width: '100%',
                    }}
                  />
                </Item>
                {isSubmitting
                  ? (<Spinner color="red" />)
                  : (
                    <TouchableOpacity style={{ paddingLeft: 15 }}>
                      <Button block onPress={handleSubmit}>
                        <Text>Update</Text>
                      </Button>
                    </TouchableOpacity>
                  )}
              </Form>
            )}
          </Formik>
        </Content>
      </Container>
    );
  }
}

EditHomemadeMealScreen.propTypes = {
  navigation: navigationShape.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(EditHomemadeMealScreen);
