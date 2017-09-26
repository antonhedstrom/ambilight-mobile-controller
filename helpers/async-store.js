import { AsyncStorage } from 'react-native';

const prefix = 'ambilight-hue';

function set(key, value) {
  return AsyncStorage.setItem(`@${prefix}:${key}`, value);
}
function get(key) {
  return AsyncStorage.getItem(`@${prefix}:${key}`).then(value => {
    if ( value !== null ) {
      return value;
    }
  });
}

export { set, get }
