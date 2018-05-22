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
    register: 'Register account',
    name: 'Name'
  },
  vni: {
    email: 'Email',
    password: 'Password',
    rePassword: 'Confirm password',
    sendRequest: 'Send request',
    phone: 'Phone',
    address: 'Address',
    forgot: 'Forgot password',
    register: 'Register account',
    name: 'Họ tên'
  }
});

setLanguage(strings);
module.exports = strings;
