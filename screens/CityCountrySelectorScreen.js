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
  Spinner,
  Content,
  List,
  ListItem,
} from 'native-base';
import { navigationShape, cityCountryListWithMetadataShape } from '../constants/Shapes';

const filterCityCountry = (userInput, allCityCountry) => {
  if (!userInput || userInput.length < 3) {
    return [];
  }
  const userInputLower = userInput.toLowerCase();
  return allCityCountry
    .filter(cc => cc.city.toLowerCase().startsWith(userInputLower));
};

class CityCountrySelectorScreen extends React.Component {
  constructor(state, props) {
    super(state, props);
    this.state = {
      query: undefined,
    };
  }

  render() {
    const { cityCountryListWithMetadata, navigation } = this.props;
    const onCityCountrySelected = navigation.getParam('onCityCountrySelected');
    const { query } = this.state;

    if (!cityCountryListWithMetadata) {
      return null;
    }

    if (cityCountryListWithMetadata.loading) {
      return <Spinner />;
    }

    const cityCountryList = cityCountryListWithMetadata.value;

    // TODO handle if city country list couldn't be loaded

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search City"
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
            dataArray={filterCityCountry(query, cityCountryList)}
            renderRow={cityCountry => (
              <ListItem
                onPress={() => {
                  onCityCountrySelected(cityCountry);
                  navigation.goBack();
                }}
              >
                <Text>
                  {`${cityCountry.city}, ${cityCountry.country}`}
                </Text>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

CityCountrySelectorScreen.propTypes = {
  navigation: navigationShape.isRequired,
  cityCountryListWithMetadata: cityCountryListWithMetadataShape.isRequired,
};

const mapStateToProps = state => ({
  cityCountryListWithMetadata: state.cityCountryList,
});

export default connect(mapStateToProps)(CityCountrySelectorScreen);
