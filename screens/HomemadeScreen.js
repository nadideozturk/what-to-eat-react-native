import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import GridList from 'react-native-grid-list';

import { MonoText } from '../components/StyledText';

const items = [
  { thumbnail: { uri: 'https://res.cloudinary.com/dv0qmj6vt/image/upload/v1535268790/whattoeat/homemademeals/6192f280-b3db-4fd4-8b12-fa14a71b564a.png' } },
  { thumbnail: { uri: 'https://res.cloudinary.com/dv0qmj6vt/image/upload/v1535271844/whattoeat/homemademeals/df354283-c92f-4e85-b759-7118b465d453.png' } },
  { thumbnail: { uri: 'https://res.cloudinary.com/dv0qmj6vt/image/upload/v1536395221/whattoeat/homemademeals/41fb77fb-3475-4b4a-b1d1-197780bed424.png' } },
  { thumbnail: { uri: 'https://res.cloudinary.com/dv0qmj6vt/image/upload/v1536649238/whattoeat/homemademeals/7e90512d-a70c-4d2f-8714-6665fad8de27.png' } },
  { thumbnail: { uri: 'https://res.cloudinary.com/dv0qmj6vt/image/upload/v1536649322/whattoeat/homemademeals/577661c9-28c8-42ec-b8ee-2c13ce8a9b0d.png' } },
  { thumbnail: { uri: 'https://res.cloudinary.com/dv0qmj6vt/image/upload/v1536650711/whattoeat/homemademeals/da5c2462-9cab-4dcc-a627-2453fac118f3.png' } },
  { thumbnail: { uri: 'https://res.cloudinary.com/dv0qmj6vt/image/upload/v1536648960/whattoeat/homemademeals/8a1566a1-f8a4-4be7-a98d-b7e64cb11854.png' } },
];

export default class HomemadeScreen extends React.Component {
  renderItem = ({ item, index }) => (
    <Image style={styles.image} source={item.thumbnail} />
  );

  render() {
    return (
      <View style={styles.container}>
        <GridList
          showSeparator
          data={items}
          numColumns={3}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
