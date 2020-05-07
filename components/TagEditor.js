import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, Text, Badge, Button, Item } from 'native-base';
import { tagShape, navigationShape } from '../constants/Shapes';
import Image from './Image';

export default class TagEditor extends React.PureComponent {
  render() {
    const { tags, navigation } = this.props;
    const { onTagSelected, onTagRemoved } = this.props;

    return (
      <Item>
        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 5, flexWrap: 'wrap' }}>
          {/* TODO re-use */}
          <Text style={{ marginRight: 5 }}>Tags</Text>
          {
            tags.map(tag => (
              <Badge
                warning
                key={tag.id}
                style={{ marginRight: 3, marginBottom: 5, flexDirection: 'row' }} // TODO re-use
              >
                <Text>
                  {tag.tagName}
                </Text>
                <TouchableOpacity
                  onPress={() => onTagRemoved(tag)}
                  style={{ justifyContent: 'center' }}
                >
                  <Image
                    style={{ width: 15, height: 15, marginLeft: 2 }}
                    source={require('../assets/images/close.png')}
                  />
                </TouchableOpacity>
              </Badge>
            ))
          }
          <Button
            small
            transparent
            onPress={() => navigation.navigate(
              'TagSelector',
              {
                onTagSelected,
                alreadySelectedTags: tags,
              },
            )}
          >
            <Icon
              transparent
              name="add-circle"
              style={{ marginRight: 5, marginLeft: 5, fontSize: 24, color: '#303030' }}
            />
          </Button>
        </View>
      </Item>
    );
  }
}

TagEditor.propTypes = {
  tags: PropTypes.arrayOf(tagShape).isRequired,
  navigation: navigationShape.isRequired,
  onTagSelected: PropTypes.func.isRequired,
  onTagRemoved: PropTypes.func.isRequired,
};
