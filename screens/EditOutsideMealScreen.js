import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { navigationShape } from '../constants/Shapes';
import { imagePickerOptions, getMealImageSourceWithDeafult } from '../constants/config/Defaults';
import Image from '../components/Image';
import TagEditor from '../components/TagEditor';
import NumericInput from '../components/NumericInput';
import SubmitButton from '../components/SubmitButton';
import * as OutsideMealActions from '../actionCreators/OutsideMealActions';

class EditOutsideMealScreen extends React.Component {
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
              restaurantName: meal.restaurantName,
              photoUrl: meal.photoUrl,
              imageFile: meal.imageFile,
              price: String(meal.price),
              tags: meal.tags,
            }}
            validate={() => {} /* TODO implement validation */}
            onSubmit={async values => {
              // TODO consider if actions.setSubmitting() is necessary
              const updatedMeal = {
                ...meal,
                name: values.mealName,
                restaurantName: values.restaurantName,
                catId: 'defaultCategory',
                price: Number(values.price),
                photoContent: '',
                tags: values.tags,
              };
              OutsideMealActions.updateOutsideMeal({
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
                  <Input
                    placeholder="Restaurant name"
                    onBlur={handleBlur('restaurantName')}
                    onChangeText={handleChange('restaurantName')}
                    style={{ alignSelf: 'flex-start' }}
                    value={values.restaurantName}
                  />
                </Item>
                <Item last>
                  <Item last>
                    <NumericInput
                      placeholder="Price"
                      onBlur={handleBlur('price')}
                      onChangeText={handleChange('price')}
                      value={values.price}
                    />
                  </Item>
                </Item>
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

EditOutsideMealScreen.propTypes = {
  navigation: navigationShape.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(EditOutsideMealScreen);
