import { NetInfo } from 'react-native';
import { _alert } from './alert';
import alertStrings from '../localization/alert';

export const getConnectionInfo = callback => {
  NetInfo.getConnectionInfo().then(connectionInfo => {
    console.log(connectionInfo);
    if (connectionInfo.type === 'none') {
      _alert(alertStrings.ok, alertStrings.deviceOffline);
    } else {
      callback();
    }
  });
};
