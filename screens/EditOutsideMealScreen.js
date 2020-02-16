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
} from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { navigationShape } from '../constants/Shapes';
import NumericInput from '../components/NumericInput';
import * as OutsideMealActions from '../actionCreators/OutsideMealActions';

const imagePickerOptions = {
  // todo test video
  allowsEditing: true,
  aspect: [1, 1],
  // quality
};

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
            }}
            validate={() => {} /* TODO implement validation */}
            onSubmit={async (values) => {
              // TODO consider if actions.setSubmitting() is necessary
              const updatedMeal = {
                ...meal,
                name: values.mealName,
                restaurantName: values.restaurantName,
                catId: 'defaultCategory',
                price: Number(values.price),
                photoContent: 'Empty',
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
                {isSubmitting
                  ? (<Spinner color="red" />)
                  : (<Button onPress={handleSubmit}><Text>Update</Text></Button>)}
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
