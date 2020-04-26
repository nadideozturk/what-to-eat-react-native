import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Text,
  Item,
  Icon,
  Input,
  Button,
  Content,
  List,
  ListItem,
} from 'native-base';
import Spinner from '../components/Spinner';
import { navigationShape, tagListWithMetadataShape } from '../constants/Shapes';

const filterTags = (userInput, allTags, selectedTags) => {
  if (!userInput) {
    return [];
  }
  const userInputLower = userInput.toLowerCase();
  return allTags
    .filter(t => t.tagName.startsWith(userInputLower))
    .filter(t => !selectedTags.some(selectedTag => t.id === selectedTag.id));
};

class TagSelectorScreen extends React.Component {
  constructor(state, props) {
    super(state, props);
    this.state = {
      query: undefined,
    };
  }

  render() {
    const { tagListWithMetadata, navigation } = this.props;
    const onTagSelected = navigation.getParam('onTagSelected');
    const alreadySelectedTags = navigation.getParam('alreadySelectedTags');
    const { query } = this.state;

    if (!tagListWithMetadata) {
      return null;
    }

    if (tagListWithMetadata.loading) {
      return <Spinner />;
    }

    const tags = tagListWithMetadata.value;

    // TODO handle if tag list couldn't be loaded

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search Tag"
              onChangeText={text => this.setState({ query: text })}
            />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
          <List
            dataArray={filterTags(query, tags, alreadySelectedTags)}
            renderRow={tag => (
              <ListItem
                onPress={() => {
                  onTagSelected(tag);
                  navigation.goBack();
                }}
              >
                <Text>{tag.tagName}</Text>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

TagSelectorScreen.propTypes = {
  navigation: navigationShape.isRequired,
  tagListWithMetadata: tagListWithMetadataShape.isRequired,
  // selectedTags: PropTypes.arrayOf(tagShape).isRequired,
};

const mapStateToProps = state => ({
  tagListWithMetadata: state.tags,
});

export default connect(mapStateToProps)(TagSelectorScreen);
