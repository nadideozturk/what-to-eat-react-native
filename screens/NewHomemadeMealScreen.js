import React from 'react';
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
import { Image } from 'react-native';
import {
  Formik,
} from 'formik';
import * as ImagePicker from 'expo-image-picker';

const imagePickerOptions = {
  // todo test video
  allowsEditing: true,
  aspect: [1, 1],
  // quality
};

export default class NewHomemadeMealScreen extends React.Component {
  static navigationOptions = {
    title: 'New Homemade Meal ',
  };

  render() {
    return (
      <Container>
        <Content>
          <Formik
            initialValues={{ mealName: '', photoUrl: '', photoLocalUri: '' }}
            validate={() => {
              const errors = {};
              // if (!values.mealName) {
              //   errors.namealNameme = 'Required';
              // }
              // if (!values.photoUrl) {
              //   errors.photoUrl = '';
              // }
              return errors;
            }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values));
                actions.setSubmitting(false);
              }, 2000);
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
                  <Input
                    placeholder="Meal name"
                    onBlur={handleBlur('mealName')}
                    onChangeText={handleChange('mealName')}
                    value={values.mealName}
                  />
                </Item>
                <Item last>
                  <Input
                    placeholder="Duration"
                    onBlur={handleBlur('duration')}
                    onChangeText={handleChange('duration')}
                    value={values.duration}
                  />
                </Item>
                <Button
                  onPress={async () => {
                    const result = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);
                    if (result.cancelled) {
                      console.log('cancelled');
                      return;
                    }
                    handleChange('image')(result.uri);
                  }}
                >
                  <Text>Choose Image</Text>
                </Button>
                {values.image
                  ? <Image source={{ uri: values.image }} style={{ width: 200, height: 200 }} />
                  : null}
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
