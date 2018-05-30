import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    loadingData: 'Loading data, please wait ...',
    email: 'Email',
    currentPassword: 'Current password',
    password: 'Password',
    rePassword: 'Confirm password',
    sendRequest: 'Send request',
    phone: 'Phone',
    address: 'Address',
    forgot: 'Forgot password',
    register: 'Register account',
    name: 'Name',
    inputInfo: 'Enter your information',
    inputPassword: 'Enter your password'
  },
  vni: {
    loadingData: 'Đang tải dữ liệu, vui lòng đợi ...',
    email: 'Email',
    currentPassword: 'Mật khẩu hiện tại',
    password: 'Password',
    rePassword: 'Confirm password',
    sendRequest: 'Send request',
    phone: 'Phone',
    address: 'Address',
    forgot: 'Forgot password',
    register: 'Register account',
    name: 'Họ tên',
    inputInfo: 'Nhập thông tin của bạn',
    inputPassword: 'Nhập mật khẩu của bạn'
  }
});

setLanguage(strings);
module.exports = strings;
