import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    email: 'Email',
    password: 'Password',
    rePassword: 'Confirm password',
    sendRequest: 'Send request',
    phone: 'Phone',
    address: 'Address',
    forgot: 'Forgot password',
    register: 'Register account'
  },
  vni: {
    email: 'Email',
    password: 'Password',
    rePassword: 'Confirm password',
    sendRequest: 'Send request',
    phone: 'Phone',
    address: 'Address',
    forgot: 'Forgot password',
    register: 'Register account'
  },
});

setLanguage(strings);
module.exports = strings;
