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
import { Image, AsyncStorage } from 'react-native';
import {
  Formik,
} from 'formik';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { navigationShape } from '../constants/Shapes';

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
    xhr.open('POST', url, true);
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

export default class NewHomemadeMealScreen extends React.Component {
  static navigationOptions = {
    title: 'New Homemade Meal ',
  };

  render() {
    return (
      <Container>
        <Content>
          <Formik
            initialValues={{ mealName: '', photoUrl: '', imageFile: '' }}
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
              uploadFile(values.imageFile)
                .then((xhrResponse) => {
                  // console.log('xhrResponse.target.response');
                  // console.log(xhrResponse.target.response);
                  const responseUrl = JSON.parse(xhrResponse.target.response).secure_url;
                  // console.log(`Successfully uploaded to ${responseUrl}`);
                  return responseUrl;
                })
                .then(async (photoUrl) => {
                  // alert(`upload successful, ${photoUrl}`);
                  const meal = {
                    name: values.mealName,
                    photoUrl,
                    catId: 'defaultCategory',
                  };
                  return axios.post(
                    'http://ec2-13-58-5-77.us-east-2.compute.amazonaws.com:8080/homemademeals',
                    meal,
                    {
                      headers: {
                        Authorization: await AsyncStorage.getItem('idToken'),
                      },
                    },
                  );
                })
                .then(() => {
                  const { navigation } = this.props;
                  actions.setSubmitting(false);
                  navigation.goBack();
                })
                .catch((error) => {
                  // console.log('error.response');
                  // console.log(error.response);
                  alert(`upload failed, ${error}`);
                  actions.setSubmitting(false);
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
                    const response = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);
                    if (response.cancelled) {
                      console.log('cancelled');
                      return;
                    }
                    handleChange('imageFile')(response);
                  }}
                >
                  <Text>Choose Image</Text>
                </Button>
                {values.imageFile
                  ? (
                    <Image
                      source={{ uri: values.imageFile.uri }}
                      style={{ width: 200, height: 200 }}
                    />
                  )
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

NewHomemadeMealScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
