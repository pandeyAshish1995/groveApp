import React from 'react';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';

import PropTypes from 'prop-types';

const PERMMISSION_NOT_GRANTED = 'permissions not granted';

export default class FileInput extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array,
    ]),
    textStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array,
    ]),
    upload: PropTypes.func,
    onUpload: PropTypes.func,
  };
  static defaultProps = {
    placeholder: 'select file',
  };
  constructor(props) {
    super(props);
    this.buttonText = this.setButtonText(props.placeholder);
    this.state = {
      uploading: false,
      localPath: null,
    };
  }
  setButtonText = value => {
    this.buttonText = value;
  };

  onError = error => {
    let errorMessage = typeof error === 'string' ? error : error.message;
    if (!errorMessage) {
      return;
    }
    console.warn('~~~~~~error message', errorMessage);
  };

  isPermissionGranted = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        const cameraGrant = grants[PermissionsAndroid.PERMISSIONS.CAMERA];
        const writeStorageGrant =
          grants[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE];
        const readStorageGrant =
          grants[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE];
        if (
          cameraGrant !== PermissionsAndroid.RESULTS.GRANTED ||
          writeStorageGrant !== PermissionsAndroid.RESULTS.GRANTED ||
          readStorageGrant !== PermissionsAndroid.RESULTS.GRANTED
        ) {
          if (
            cameraGrant === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
            writeStorageGrant === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
            readStorageGrant === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
          ) {
            this.onError(PERMMISSION_NOT_GRANTED);
          }
          return false;
        }
      } catch (err) {
        return false;
      }
    }
    return true;
  };
  browse = async () => {
    let permissionGranted = await this.isPermissionGranted();
    if (!permissionGranted) {
      return;
    }
    let customButtons = [
      {name: 'takeImage', title: 'Take Picture'},
      {name: 'chooseImage', title: 'Photo Gallery'},
    ];
    if (!this.props.onlyImage) {
      customButtons.push({name: 'chooseVideo', title: 'Videos'});
      customButtons.push({name: 'selectFile', title: 'Documents'});
    }
     
    ImagePicker.showImagePicker(
      {
        title: null,
        takePhotoButtonTitle: null,
        chooseFromLibraryButtonTitle: null,
        customButtons,
      },
      response => {
        this.handleResponse(response);
      },
    );
  };
  takeImage = () => {
    let options = {cameraRoll: true, waitUntilSaved: true};
    if (Platform.OS === 'ios') {
      options = {
        waitUntilSaved: true,
      };
    }
    ImagePicker.launchCamera(
      {
        storageOptions: options,
      },
      response => {
        this.handleResponse(response);
      },
    );
  };
  chooseImage = () => {
    ImagePicker.launchImageLibrary({}, response => {
      this.handleResponse(response);
    });
  };
  chooseVideo = () => {
    ImagePicker.showImagePicker(
      {
        mediaType: 'video',
        takePhotoButtonTitle: 'Take Video',
        title: null,
        storageOptions: {
          cameraRoll: true,
          waitUntilSaved: true,
        },
      },
      response => {
        this.handleResponse(response);
      },
    );
  };

  selectFile = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      this.handleResponse(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }
  handleResponse = response => {
    if (response.didCancel) {
      console.warn('User cancelled image picker');
    } else if (response.error) {
      this.onError(response.error);
    } else if (response.customButton) {
      switch (response.customButton) {
        case 'takeImage':
          this.takeImage();
          break;
        case 'chooseImage':
          this.chooseImage();
          break;
        case 'chooseVideo':
          this.chooseVideo();
          break;
        case 'selectFile':
          this.selectFile();
      }
    } else {
      const {path, uri} = response;
      if (response && !response.name) {
        response.name = response.fileName;
      }
      if (Platform.OS === 'ios') {
        let path = response.uri;
        path = '~' + path.substring(path.indexOf('/Documents'));
        if (!response.fileName) response.name = path.split('/').pop();
      } else if (!response.name && response.type === 'application/pdf') {
        response.name = `${new Date().getTime()}.pdf`;
      }
      this.setState({
        uploading: true,
        localPath: Platform.OS === 'ios' ? uri : 'file://' + path,
      });
      let {upload, uploadOptions = {}, onUpload, setValue, field} = this.props;

      upload(response, uploadOptions)
        .then(({response}) => {
          let value = response && response.length ? response[0] : response;
          setValue && setValue({field, value});
          onUpload && onUpload(value);
          this.setState({uploading: false});
        })
        .catch(err => {
          this.setState({uploading: false});
        });
    }
  };

  render() {
    const {
      data,
      style,
      textStyle,
      imageStyle,
      field,
      placeholder,
      render,
      hideLink,
      browseComponent
    } = this.props;
    let {uploading} = this.state;
    let value = data && field && data[field];

    let buttonTextFromData = value && value['name'];

    let buttonText = void 0;
    if (buttonTextFromData !== this.oldValue) {
      buttonText = buttonTextFromData;
      this.buttonText = void 0;
    } else if (this.buttonText) {
      buttonText = this.buttonText;
    } else {
      buttonText = buttonTextFromData;
    }
    if (!buttonText) {
      buttonText = placeholder;
    }

    this.oldValue = buttonTextFromData;
    if (render) {
      return render(this.props, {
        onPress: this.browse,
        uploading: this.state.uploading,
        localPath: this.state.localPath,
      });
    }
    return (
      <TouchableOpacity style={[styles.container, style]} onPress={this.browse}>
        {browseComponent ? browseComponent : (
          <Text numberOfLines={1} style={[styles.leftTextStyle, textStyle]}>
            {buttonText}
          </Text>
        )}
        {uploading ? (
          <ActivityIndicator size="small" style={{paddingLeft: 10}} />
        ) :null}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {flexDirection: 'row', justifyContent: 'space-between'},
  leftTextStyle: {
    fontSize: 14,
    color: '#000',
  },
  rightvViewStyle: {
    backgroundColor: 'white',
  },
});
