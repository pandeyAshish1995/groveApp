import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import color from '../styles/colors';
import loaderImage from '../static/images/loader.gif';

const {loaderBackgroundColor} = color;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Loader({loader}) {
  return (
    <Modal
      animationType="none"
      transparent
      visible={loader}
      onRequestClose={() => {}}>
      <View style={styles.loaderContainer}>
        <View
          style={[
            styles.loaderContainer,
            {
              opacity: 0.3,
              backgroundColor: loaderBackgroundColor,
            },
          ]}
        />
        {/* <Image
          source={loaderImage}
          style={styles.loader}
          resizeMode="contain"
        /> */}
        <ActivityIndicator size={'large'} color="#ea3d5e" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
    opacity: 1,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width,
    height,
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 1001,
    height: 100,
    width: 100,
  },
});
