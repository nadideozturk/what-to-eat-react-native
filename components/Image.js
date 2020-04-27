/* eslint-disable */
import React from 'react';
import CachedImage from 'react-native-expo-cached-image';
import { Image as NativeImage } from 'react-native';

export default class Image extends React.PureComponent {
  render() {
    const { source } = this.props;
    if (source && source.uri) {
      return (
        <CachedImage {...this.props} />
      );
    }
    return (
      <NativeImage {...this.props} />
    );
  }
}
