import React from 'react';
import PropTypes from 'prop-types';
import {
  Item,
  Text,
} from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { tagListWithMetadataShape, tagShape } from '../constants/Shapes';

const filterTags = (userInput, allTags, selectedTags) => {
  if (!userInput) {
    return [];
  }
  const userInputLower = userInput.toLowerCase();
  return allTags
    .filter((t) => t.tagName.startsWith(userInputLower))
    .filter((t) => !selectedTags.includes(t));
};

export default class TagSelector extends React.Component {
  constructor(state, props) {
    super(state, props);
    this.state = {
      tagsQuery: undefined,
    };
  }

  render() {
    const { tagListWithMetadata, onSelectTag, selectedTags } = this.props;
    if (!tagListWithMetadata || !tagListWithMetadata.value) {
      return null;
    }

    console.log('selectedTags');
    console.log(selectedTags);

    const { tagsQuery } = this.state;
    return (
      <Item style={{
        zIndex: 2,
        backgroundColor: 'transparent',
      }}
      >
        <Text>Tags </Text>
        <Autocomplete
          data={filterTags(tagsQuery, tagListWithMetadata.value, selectedTags)}
          defaultValue={null}
          onChangeText={(text) => this.setState({ tagsQuery: text })}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ zIndex: 1, backgroundColor: '#aa88cc' }}
              onPress={() => onSelectTag(item)}
            >
              <Text>{item.tagName}</Text>
            </TouchableOpacity>
          )}
          containerStyle={{
            width: '90%',
            paddingTop: 10,
            paddingRight: 20,
            paddingBottom: 10,
            paddingLeft: 10,
            zIndex: 2,
          }}
          listStyle={{ zIndex: 1, position: 'absolute', backgroundColor: '#efefef' }}
        />
      </Item>
    );
  }
}

TagSelector.propTypes = {
  tagListWithMetadata: tagListWithMetadataShape.isRequired,
  onSelectTag: PropTypes.func.isRequired,
  // onRemoveTag: PropTypes.func.isRequired,
  selectedTags: PropTypes.arrayOf(tagShape).isRequired,
};
