import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Input, Icon } from 'native-base';

export default class SearchBox extends React.PureComponent {
  render() {
    const { onChangeText } = this.props;

    return (
      <View style={styles.container}>
        <Icon name="search" />
        <Input
          placeholder="Search"
          onChangeText={value => onChangeText(value)}
        />
      </View>
    );
  }
}

SearchBox.propTypes = {
  onChangeText: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
});
