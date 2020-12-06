import {Linking, Alert} from 'react-native';

export function callNumber(number) {
  Linking.canOpenURL(number)
    .then((supported) => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(number);
      }
    })
    .catch((error) => console.log('callNumber error-------', error));
}
