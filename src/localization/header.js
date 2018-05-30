import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    close: 'Close',
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    searchLabel: 'Search',
    historyLabel: 'History',
    historyTitle: 'Saved Searches',
    favoriteLabel: 'Favorite',
    favoriteTitle: 'Favorite Saved',
    profileLabel: 'Profile',
    profileTitle: 'Profile',
    menuLabel: 'Menu',
    menuTitle: 'Menu',
    filter: 'Filter',
    searchCityPlaceholder: 'Search address',
    customer: 'Customer',
    agency: 'Agency',
    sortScreen: 'Sort',
    filterScreen: 'Filters',
    additionalInformation: 'Edit account',
    changePassword: 'Change password',
    loginScreen: 'Login',
    registerScreen: 'Register',
    forgotScreen: 'Forgot'
  },
  vni: {
    close: 'Huỷ',
    back: 'Quay lại',
    save: 'Lưu',
    cancel: 'Huỷ',
    delete: 'Xoá',
    searchLabel: 'Tìm kiếm',
    historyLabel: 'Đã tìm',
    favoriteLabel: 'Yêu thích',
    profileLabel: 'Tài khoản',
    menuLabel: 'Menu',
    filter: 'Lọc',
    searchCityPlaceholder: 'Tìm kiếm theo địa chỉ',
    customer: 'Khách hàng',
    agency: 'Nhà môi giới',
    sortScreen: 'Sắp xếp',
    filterScreen: 'Lọc',
    additionalInformation: 'Chỉnh sửa tài khoản',
    changePassword: 'Thay đổi mật khẩu',
    loginScreen: 'Đăng nhập',
    registerScreen: 'Đăng ký',
    forgotScreen: 'Quên mật khẩu'
  }
});

setLanguage(strings);
module.exports = strings;
