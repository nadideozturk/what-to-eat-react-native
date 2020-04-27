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
import NumericInput from '../components/NumericInput';
import SubmitButton from '../components/SubmitButton';
import TagEditor from '../components/TagEditor';
import * as OutsideMealActions from '../actionCreators/OutsideMealActions';

class NewOutsideMealScreen extends React.Component {
  constructor(props) {
    super(props);
    this.imagePickerButtonRef = React.createRef();
    this.firstInputRef = React.createRef();
  }

  async componentDidMount() {
    if (this.imagePickerButtonRef.current) {
      this.imagePickerButtonRef.current.touchableHandlePress();
    }
  }

  static navigationOptions = {
    title: 'New Outside Meal ',
  };

  render() {
    const { dispatch, navigation } = this.props;

    return (
      <Container>
        <Content>
          <Formik
            initialValues={{
              mealName: '',
              restaurantName: '',
              price: '',
              photoUrl: '',
              imageFile: '',
              tags: [],
            }}
            validate={() => {} /* TODO implement validation */}
            onSubmit={values => {
              // TODO consider if actions.setSubmitting() is necessary
              const meal = {
                name: values.mealName,
                catId: 'defaultCategory',
                price: parseFloat(values.price),
                restaurantName: values.restaurantName,
                tags: values.tags,
              };
              OutsideMealActions.createOutsideMeal({
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
                      : (
                        <Image
                          source={getMealImageSourceWithDeafult()}
                          style={{ height: 60, width: 60 }}
                        />
                      )}
                  </TouchableOpacity>
                  <Input
                    ref={this.firstInputRef}
                    placeholder="Meal name"
                    onBlur={handleBlur('mealName')}
                    onChangeText={handleChange('mealName')}
                    value={values.mealName}
                    style={{ alignSelf: 'flex-start' }}
                  />
                </Item>
                <Item>
                  <Input
                    placeholder="Restaurant name"
                    onBlur={handleBlur('restaurantName')}
                    onChangeText={handleChange('restaurantName')}
                    value={values.restaurantName}
                  />
                </Item>
                <Item last>
                  <NumericInput
                    placeholder="Price"
                    onBlur={handleBlur('price')}
                    onChangeText={handleChange('price')}
                    value={values.price}
                  />
                </Item>
                <TagEditor
                  tags={values.tags}
                  navigation={navigation}
                  onTagSelected={tag => handleChange('tags')([...values.tags, tag])}
                  onTagRemoved={tag => handleChange('tags')(values.tags.filter(t => t !== tag))}
                />
                <SubmitButton
                  text="Create"
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

NewOutsideMealScreen.propTypes = {
  navigation: navigationShape.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(NewOutsideMealScreen);
