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
import { getUrl } from '../constants/config/BackendConfig';
import NumericInput from '../components/NumericInput';

const imagePickerOptions = {
  // todo test video
  allowsEditing: true,
  aspect: [1, 1],
  // quality
};
const cloudName = 'dv0qmj6vt';
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

export default class NewOutsideMealScreen extends React.Component {
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
                    price: parseFloat(values.price),
                    restaurantName: values.restaurantName,
                  };
                  return axios.post(
                    getUrl('/outsidemeals'),
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
NewOutsideMealScreen.propTypes = {
  navigation: navigationShape.isRequired,
};
