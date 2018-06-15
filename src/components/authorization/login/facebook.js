import FBSDK from 'react-native-fbsdk';

import { _alert } from '../../../utils/alert';
import alertStrings from '../../../localization/alert';

const { LoginManager, AccessToken, GraphRequest, GraphRequestManager } = FBSDK;

_responseInfoCallback = (error, result) => {
  if (error) {
    _alert(alertStrings.error, `(code = ${error.code}), ${error.message}`, [
      { text: alertStrings.ok }
    ]);
  } else {
    console.log(result);
  }
};

export const _requestFB = async callback => {
  LoginManager.logOut();
  LoginManager.logInWithPublishPermissions(['publish_actions'])
    .then((result, error) => {
      if (error) {
        _alert(alertStrings.error, `(code = ${error.code}), ${error.message}`, [
          { text: alertStrings.ok }
        ]);
      } else if (result.isCancelled) {
        console.log('isCanceled');
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          const infoRequest = new GraphRequest(
            '/me',
            {
              parameters: {
                fields: {
                  string: 'email,name,location,birthday,photos' // what you want to get
                },
                access_token: {
                  string: data.accessToken // put your accessToken here
                }
              }
            },
            (error, result) => {
              if (error) {
                _alert(alertStrings.error, `(code = ${error.code}), ${error.message}`, [
                  { text: alertStrings.ok }
                ]);
              } else {
                const opts = Object.assign(
                  {},
                  {
                    body: {
                      provider: 'facebook',
                      provider_id: result.id,
                      name: result.name,
                      email: result.email,
                      location: result.location,
                      birthday: result.birthday,
                      photos: result.photos
                    }
                  }
                );

                callback(opts);
              }
            }
          );

          new GraphRequestManager().addRequest(infoRequest).start();
        });
      }
    })
    .catch(error => {
      _alert(alertStrings.error, `(code = ${error.code}), ${error.message}`, [
        { text: alertStrings.ok }
      ]);
    });
};
