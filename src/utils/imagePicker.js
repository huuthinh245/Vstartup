import { PermissionsAndroid, NativeModules, Platform } from 'react-native';
import Permissions from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';

import { _alert } from './alert';

const openSettingsAndroid = permission => {
  _alert('Authorize permission', `Grant '${permission} permission' to use this feature.`, [
    {
      text: 'Go to settings',
      onPress: () =>
        NativeModules.OpenSettings.openNetworkSettings(data => {
          if (!data) {
            _alert(
              'Error',
              "An error has occurred while device try opening settings, please manual enable 'Camera permission'"
            );
          }
        })
    },
    {
      text: 'Cancel'
    }
  ]);
};

const openSettingsIos = permission => {
  const canOpenSetting = Permissions.canOpenSettings();
  if (canOpenSetting) {
    _alert('Authorize permission', `Grant '${permission} permission' to use this feature.`, [
      {
        text: 'Go to settings',
        onPress: () => Permissions.openSettings()
      },
      {
        text: 'Cancel'
      }
    ]);
  } else {
    _alert(
      'Error',
      `An error has occurred while device try opening settings, please manual enable '${permission} permission'`
    );
  }
};

const resultGranted = PermissionsAndroid.RESULTS.GRANTED;
const resultNever = PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;

const permissionCamera = PermissionsAndroid.PERMISSIONS.CAMERA;
const permissionStorage = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

export const imagePicker = ({ multiple, callback }) => {
  return Platform.OS === 'ios'
    ? imagePickerIos(multiple, callback)
    : imagePickerAndroid(multiple, callback);
};

const imagePickerIos = async (multiple = true, callback = () => {}) => {
  const per = await Permissions.request('photo', { type: 'always' });
  if (per === 'restricted') {
    _alert(
      'Error',
      'This feature is not supported by the device or because it has been blocked by parental controls'
    );
  } else if (per === 'authorized') {
    try {
      const images = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple,
        width: 160,
        height: 90,
        cropping: true,
        includeBase64: true
      });
      callback(images);
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        _alert('Error', error.message);
      }
    }
  } else if (per === 'denied') {
    openSettingsIos('Photo');
  }
};

const imagePickerAndroid = async (multiple = true, callback = () => {}) => {
  const per = await PermissionsAndroid.request(permissionStorage);
  if (per === resultGranted) {
    try {
      const images = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple,
        includeBase64: true
      });
      callback(images);
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        _alert('Error', error.message);
      }
    }
  } else if (per === resultNever) {
    openSettingsAndroid('Storage');
  }
};

export const cameraPicker = ({ callback }) => {
  return Platform.OS === 'ios' ? cameraPickerIos(callback) : cameraPickerAndroid(callback);
};

const cameraPickerIos = async (callback = () => {}) => {
  const per = await Permissions.request('camera');
  if (per === 'restricted') {
    _alert(
      'Error',
      'This feature is not supported by the device or because it has been blocked by parental controls'
    );
  } else if (per === 'authorized') {
    try {
      const image = await ImagePicker.openCamera({
        width: 1600,
        height: 900,
        cropping: true,
        includeBase64: true
      });
      callback(image);
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        _alert('Error', error.message);
      }
    }
  } else if (per === 'denied') {
    openSettingsIos('Camera');
  }
};

const cameraPickerAndroid = async (callback = () => {}) => {
  const per = await PermissionsAndroid.request(permissionCamera);
  if (per === resultGranted) {
    try {
      const image = await ImagePicker.openCamera({
        width: 1600,
        height: 900,
        cropping: true,
        includeBase64: true
      });
      callback(image);
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        _alert('Error', error.message);
      }
    }
  } else if (per === resultNever) {
    openSettingsAndroid('Camera');
  }
};
