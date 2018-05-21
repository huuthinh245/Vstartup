import { GoogleSignin } from 'react-native-google-signin';

import { googleSignin } from '../../../utils/socials';
import alertStrings from '../../../localization/alert';
import { _alert } from '../../../utils/alert';

export const _setupGoogleSignin = async callback => {
  try {
    await GoogleSignin.hasPlayServices({ autoResolve: true });
    await GoogleSignin.configure({
      iosClientId: googleSignin.ios_client_id,
      webClientId: googleSignin.web_client_id,
      offlineAccess: false
    });

    const user = await GoogleSignin.currentUserAsync();
    callback(user);
  } catch (err) {
    _alert(alertStrings.error, `${err.code}: ${err.message}`);
  }
};

export const _signInGoogle = callback => {
  GoogleSignin.signIn()
    .then(user => {
      callback(user);
    })
    .catch(err => {
      _alert(alertStrings.error, `${err.code}: ${err.message}`);
    })
    .done();
};

export const _signOutGoogle = callback => {
  GoogleSignin.revokeAccess()
    .then(() => GoogleSignin.signOut())
    .then(() => {
      callback();
    })
    .done();
};
