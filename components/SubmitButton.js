import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, Spinner } from 'native-base';
import { TouchableOpacity } from 'react-native';

export default class SubmitButton extends React.PureComponent {
  render() {
    const { isSubmitting, onSubmit, text } = this.props;

    if (isSubmitting) {
      return <Spinner color="red" />;
    }
    return (
      <TouchableOpacity style={{ paddingLeft: 15, marginTop: 10 }}>
        <Button
          block
          onPress={onSubmit}
        >
          <Text>{text}</Text>
        </Button>
      </TouchableOpacity>
    );
  }
}

SubmitButton.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
