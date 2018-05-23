import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    loadingData: 'Loading data, please wait ...',
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
    loadingData: 'Đang tải dữ liệu, vui lòng đợi ...',
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
