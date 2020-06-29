import * as ImageManipulator from 'expo-image-manipulator';

const MIN_RESIZE_LENGTH = 750;
const TARGET_RESIZE_LENGTH = 750;

// eslint-disable-next-line import/prefer-default-export
export const downsize = async image => {
  if (!image) {
    throw new Error('image is empty');
  }
  if (!image.width) {
    throw new Error('image.width is empty');
  }
  if (!image.height) {
    throw new Error('image.height is empty');
  }
  if (image.width <= 0) {
    throw new Error(`non positive width: ${image.width}`);
  }
  if (image.height <= 0) {
    throw new Error(`non positive height: ${image.height}`);
  }
  if (image.width <= MIN_RESIZE_LENGTH && image.height <= MIN_RESIZE_LENGTH) {
    return image;
  }
  if (!image.uri) {
    throw new Error('image.uri is empty');
  }
  return ImageManipulator.manipulateAsync(
    image.uri,
    [
      {
        resize: {
          width: TARGET_RESIZE_LENGTH,
          height: TARGET_RESIZE_LENGTH,
        },
      },
    ],
    {
      compress: 0.8,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: true,
    },
  );
};
