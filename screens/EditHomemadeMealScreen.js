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
import { Image, TouchableOpacity, AsyncStorage } from 'react-native';
import {
  Formik,
} from 'formik';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { navigationShape } from '../constants/Shapes';
import NumericInput from '../components/NumericInput';

const imagePickerOptions = {
  // todo test video
  allowsEditing: true,
  aspect: [1, 1],
  // quality
};

const cloudName = 'dv0qmj6vt';
// const resourceType = 'image';

// const uploadFile = (file) => RNFetchBlob.fetch(
//   'POST',
//   `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
//   {
//     'Content-Type': 'multipart/form-data',
//   },
//   [
//     {
//       name: 'file',
//       filename: file.name,
//       type: file.type,
//       data: RNFetchBlob.wrap(file.uri),
//     },
//     // {
//     //   name: 'upload_preset',
//     //   data: '<upload_preset>',
//     // },
//   ],
// );

function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open('PUT', url, true);
    // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');

    // Reset the upload progress bar
    // document.getElementById('progress').style.width = 0;

    // Update progress (can be used to show progress indicator)
    // xhr.upload.addEventListener("progress", function(e) {
    //   var progress = Math.round((e.loaded * 100.0) / e.total);
    //   document.getElementById('progress').style.width = progress + "%";
    //
    //   console.log(`fileuploadprogress data.loaded: ${e.loaded},
    // data.total: ${e.total}`);
    // });

    xhr.onload = resolve;
    xhr.onerror = reject;
    // const response = JSON.parse(xhr.responseText);
    // const responseUrl = response.secure_url;
    // console.log(`Successfully uploaded to ${responseUrl}`);
    // // Create a thumbnail of the uploaded image, with 150px width
    // var tokens = url.split('/');
    // tokens.splice(-2, 0, 'w_150,c_scale');
    // var img = new Image(); // HTML5 Constructor
    // img.src = tokens.join('/');
    // img.alt = response.public_id;
    // document.getElementById('gallery').appendChild(img);

    fd.append('upload_preset', 'testImage');
    // fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    // console.log('file is ');
    // console.log(file);
    fd.append('file', {
      uri: file.uri,
      type: 'image/jpeg',
      name: 'test.jpg',
    });
    // fd.append('type', file.type);
    // fd.append('type', 'image/jpeg');
    // console.log('will call cloudinary now');
    xhr.send(fd);
  });
}

export default class EditHomemadeMealScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit',
  };

  render() {
    const { navigation } = this.props;
    const meal = navigation.getParam('meal', '');

    return (
      <Container>
        <Content>
          <Formik
            initialValues={{
              mealName: meal.name,
              photoUrl: meal.photoUrl,
              imageFile: meal.imageFile,
              durationInMinutes: String(meal.durationInMinutes),
            }}
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
            onSubmit={async (values, actions) => {
              try {
                let { photoUrl } = meal;
                if (values.imageFile) {
                  const xhrResponse = await uploadFile(values.imageFile);
                  photoUrl = JSON.parse(xhrResponse.target.response).secure_url;
                }
                const uploadedMeal = {
                  ...meal,
                  name: values.mealName,
                  photoUrl,
                  catId: 'defaultCategory',
                  durationInMinutes: Number(values.durationInMinutes),
                  photoContent: 'Empty',
                };
                console.log(uploadedMeal);
                console.log(meal);
                await axios.put(
                  'http://ec2-13-58-5-77.us-east-2.compute.amazonaws.com:8080/homemademeals',
                  uploadedMeal,
                  {
                    headers: {
                      Authorization: await AsyncStorage.getItem('idToken'),
                    },
                  },
                );
                actions.setSubmitting(false);
                navigation.goBack();
              } catch (error) {
                alert(`upload failed, ${error}`);
                actions.setSubmitting(false);
              }
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
                <Item last>
                  <Item last>
                    <NumericInput
                      placeholder="Duration"
                      onBlur={handleBlur('durationInMinutes')}
                      onChangeText={handleChange('durationInMinutes')}
                      value={values.durationInMinutes}
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

EditHomemadeMealScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
