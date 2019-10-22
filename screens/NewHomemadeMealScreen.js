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
import {
  Formik,
} from 'formik';

export default class NewHomemadeMealScreen extends React.Component {
  static navigationOptions = {
    title: 'New Homemade Meal ',
  };

  render() {
    return (
      <Container>
        <Content>
          <Formik
            initialValues={{ mealName: '', photoUrl: '' }}
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
            {(props) => (
              <Form>
                <Item>
                  <Input
                    placeholder="Meal name"
                    onBlur={props.handleBlur('mealName')}
                    onChangeText={props.handleChange('mealName')}
                    value={props.values.mealName}
                  />
                </Item>
                <Item last>
                  <Input
                    placeholder="Duration"
                    onBlur={props.handleBlur('duration')}
                    onChangeText={props.handleChange('duration')}
                    value={props.values.duration}
                  />
                </Item>
                {props.isSubmitting ? (
                  <Spinner color="red" />
                ) : (
                  <Button
                    onPress={props.handleSubmit}
                  >
                    <Text>Create</Text>
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </Content>
      </Container>
    );
  }
}
