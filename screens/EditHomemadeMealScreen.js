import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { navigationShape } from '../constants/Shapes';
import { imagePickerOptions, getMealImageSourceWithDeafult } from '../constants/config/Defaults';
import TagEditor from '../components/TagEditor';
import NumericInput from '../components/NumericInput';
import RecipeEditor from '../components/RecipeEditor';
import SubmitButton from '../components/SubmitButton';
import * as HomemadeMealActions from '../actionCreators/HomemadeMealActions';

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
              tags: meal.tags,
            }}
            validate={() => {} /* TODO implement validation */}
            onSubmit={async values => {
              // TODO consider if actions.setSubmitting() is necessary
              const updatedMeal = {
                ...meal,
                name: values.mealName,
                catId: 'defaultCategory',
                durationInMinutes: Number(values.durationInMinutes),
                recipe: values.recipe,
                photoContent: 'Empty',
                tags: values.tags,
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
              <Form style={{ paddingRight: 10 }}>
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
                          source={getMealImageSourceWithDeafult(meal)}
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
                <RecipeEditor
                  onChange={handleChange('recipe')}
                  onBlur={handleBlur('recipe')}
                  value={values.recipe}
                />
                <TagEditor
                  tags={values.tags}
                  navigation={navigation}
                  onTagSelected={tag => handleChange('tags')([...values.tags, tag])}
                  onTagRemoved={tag => handleChange('tags')(values.tags.filter(t => t !== tag))}
                />
                <SubmitButton
                  text="Update"
                  isSubmitting={isSubmitting}
                  onSubmit={handleSubmit}
                />
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
