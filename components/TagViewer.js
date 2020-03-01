import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Badge } from 'native-base';
import { tagShape } from '../constants/Shapes';

export default class TagViewer extends React.PureComponent {
  render() {
    const { tags } = this.props;

    if (!tags || !tags.length) {
      return null;
    }

    return (
      <View style={{ flexDirection: 'row', marginBottom: -5, flexWrap: 'wrap' }}>
        {/* TODO re-use */}
        <Text style={{ marginRight: 5 }}>Tags</Text>
        {
          tags.map(tag => (
            <Badge
              warning
              key={tag.id}
              style={{ marginRight: 3, marginBottom: 5 }} // TODO re-use
            >
              <Text>
                {tag.tagName}
              </Text>
            </Badge>
          ))
        }
      </View>
    );
  }
}

TagViewer.propTypes = {
  tags: PropTypes.arrayOf(tagShape).isRequired,
};
