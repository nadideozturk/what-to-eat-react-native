import React from 'react';
import PropTypes from 'prop-types';
import {
  Item,
  Label,
  Textarea,
} from 'native-base';

export default class RecipeEditor extends React.PureComponent {
  render() {
    const { onBlur, onChange, value } = this.props;

    return (
      <Item
        style={{
          paddingBottom: 10,
          flexDirection: 'column',
        }}
      >
        <Label style={{
          paddingTop: 10,
          paddingBottom: 10,
          alignSelf: 'flex-start',
        }}
        >
          Recipe
        </Label>
        <Textarea
          rowSpan={value ? 8 : 4}
          bordered
          placeholder="Enter recipe (optional)"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={{ width: '100%' }}
        />
      </Item>
    );
  }
}

RecipeEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string,
};

RecipeEditor.defaultProps = {
  value: '',
};
