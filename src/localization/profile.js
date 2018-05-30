import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    name: 'name',
    mail: 'mail',
    phone: 'phone number',
    contactWith: 'Contact with agency',
    unset: 'Not added yet',
    showProj: 'All projects',
    editAccount: 'Edit your account',
    changePassword: 'Change passwod',
    logOut: 'Logout',
    areYouSure: 'Are you sure to logout ?',
    hideRealty: 'Hide this realty',
    editRealty: 'Edit this realty'
  },
  vni: {
    name: 'họ và tên',
    mail: 'mail',
    phone: 'số điện thoại',
    contactWith: 'Liên lạc với nhà môi giới',
    unset: 'Chưa bổ sung',
    showProj: 'Tất cả dự án',
    editAccount: 'Chỉnh sửa tài khoản',
    changePassword: 'Đổi mật khẩu',
    logOut: 'Đăng xuất',
    areYouSure: 'Bạn chắc chắn muốn đăng xuất ?',
    hideRealty: 'Ẩn tin bất động sản',
    editRealty: 'Chỉnh sửa tin bất động sản'
  }
});

setLanguage(strings);
module.exports = strings;
