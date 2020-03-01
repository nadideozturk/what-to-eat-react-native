const cloudName = 'dv0qmj6vt';

// eslint-disable-next-line import/prefer-default-export
export const uploadFile = file => (
  new Promise((resolve, reject) => {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open('POST', url, true);
    xhr.onload = resolve;
    xhr.onerror = reject;
    fd.append('upload_preset', 'testImage');
    fd.append('file', {
      uri: file.uri,
      type: 'image/jpeg',
      name: 'test.jpg',
    });
    xhr.send(fd);
  })
);
