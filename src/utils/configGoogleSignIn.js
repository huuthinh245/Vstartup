import { GoogleSignin } from 'react-native-google-signin';
import { Platform } from 'react-native';

import { _alert } from './alert';

export const configGoogleSignin = (iosClientId = '', webClientId = '', scopes = []) => {
  try {
    if (Platform.OS === 'ios') {
      GoogleSignin.configure({
        scopes,
        iosClientId,
        webClientId,
        offlineAccess: true
      });
    } else if (Platform.OS === 'android') {
      GoogleSignin.hasPlayServices({ autoResolve: true })
        .then(() => {
          GoogleSignin.configure({
            scopes,
            webClientId,
            offlineAccess: true
          });
        })
        .catch(err => {
          console.log(err);
          _alert('Play services error', `code: ${err.code}, message: ${err.message}`);
        });
    }
  } catch (err) {
    console.log(err);
    _alert('Google error', `code: ${err.code}, message: ${err.message}`);
  }
};
