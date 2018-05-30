import { PermissionsAndroid, NativeModules, Platform } from 'react-native';
import Permissions from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';

import { _alert } from './alert';

const title = 'Authorize Permissions';
const message = per =>
  `VStartup need to authorized ${per} Permission, please enable it before use this function !`;

const iosCanOpenSetting =
  "Please toggle on 'Camera permissions' and 'Allow Photo Acess' to 'Read and Write' to use this feature";
const iosCannotOpenSetting =
  "Please go to Settings > VStartup, toggle on 'Camera permissions' and 'Allow Photo Acess' to 'Read and Write' to use this feature";

const text = 'Go to settings';
const cancel = 'Cancel';
const openSettingsErrorMessage =
  'An error has occurred while device try opening settings, please manual enable Camera Permisstion';

const openSettingsAndroid = per => {
  _alert(title, message(per), [
    {
      text,
      onPress: () =>
        NativeModules.OpenSettings.openNetworkSettings(data => {
          if (!data) {
            alertError(openSettingsErrorMessage);
          }
        })
    },
    {
      text: cancel
    }
  ]);
};

const openSettingsIos = () => {
  const canOpenSetting = Permissions.canOpenSettings();
  if (canOpenSetting) {
    _alert(title, iosCanOpenSetting, [
      {
        text,
        onPress: () => {
          Permissions.openSettings();
        }
      }
    ]);
  } else {
    _alert(title, iosCannotOpenSetting);
  }
};

const _granted = PermissionsAndroid.RESULTS.GRANTED;
const _never = PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;

const _camera = PermissionsAndroid.PERMISSIONS.CAMERA;
const _storage = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

export const imagePicker = (mediaType, multiple, callback) => {
  return Platform.OS === 'ios'
    ? imagePickerIos(mediaType, multiple, callback)
    : imagePickerAndroid(mediaType, multiple, callback);
};

const imagePickerIos = async (mediaType = 'photo', multiple = true, callback = () => {}) => {
  const cameraPer = await Permissions.check('camera');
  const photoPer = await Permissions.check('photo', { type: 'always' });

  if (cameraPer === 'restricted' || photoPer === 'restricted') {
    _alert(
      'ERROR',
      'This feature is not supported by the device or because it has been blocked by parental controls'
    );
  } else if (cameraPer === 'restricted' || photoPer === 'authorized') {
    ImagePicker.openPicker({
      mediaType,
      multiple
    })
      .then(images => {
        callback(images);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          _alert('ERROR', error.message);
        }
      });
  } else if (cameraPer === 'undetermined') {
    Permissions.request('camera');
  } else if (photoPer === 'undetermined') {
    Permissions.request('photo', { type: 'always' });
  } else {
    openSettingsIos();
  }
};

const imagePickerAndroid = (mediaType = 'photo', multiple = true, callback = () => {}) => {
  PermissionsAndroid.requestMultiple([_camera, _storage])
    .then(granted => {
      const grantedCamera = granted[_camera];
      const grantedStorage = granted[_storage];

      if (grantedCamera === _granted && grantedStorage === _granted) {
        ImagePicker.openPicker({
          mediaType,
          multiple
        })
          .then(images => {
            callback(images);
          })
          .catch(error => {
            if (error.code !== 'E_PICKER_CANCELLED') {
              _alert('ERROR', error.message);
            }
          });
      } else if (grantedCamera === _never && grantedStorage === _granted) {
        openSettingsAndroid('Camera');
      } else if (grantedCamera === _granted && grantedStorage === _never) {
        openSettingsAndroid('Storage');
      } else if (grantedCamera === _never && grantedStorage === _never) {
        openSettingsAndroid('Camera & Storage');
      }
    })
    .catch(error => {
      console.log(error);
    });
};
