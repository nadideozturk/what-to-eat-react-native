import React from 'react';
import {
  Input,
} from 'native-base';
import PropTypes from 'prop-types';

export default class NumericInput extends React.PureComponent {
  render() {
    const {
      placeholder,
      onBlur,
      onChangeText,
      value,
    } = this.props;

    return (
      <Input
        placeholder={placeholder}
        onBlur={onBlur}
        onChangeText={(text) => onChangeText(text.replace(/\D/g, ''))}
        value={value}
        keyboardType="numeric"
      />
    );
  }
}

NumericInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
