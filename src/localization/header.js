import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    close: 'Close',
    back: 'Back',
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

    loginScreen: 'Login',
    registerScreen: 'Register',
    forgotScreen: 'Forgot'
  },
  vni: {
    close: 'Huỷ',
    back: 'Quay lại',
    searchLabel: 'Tìm kiếm',
    historyLabel: 'Đã tìm',
    favoriteLabel: 'Yêu thích',
    profileLabel: 'Tài khoản',
    menuLabel: 'Menu',
    filter: 'Lọc',
    searchCityPlaceholder: 'Tìm kiếm theo địa chỉ',
    customer: 'Khách hàng',
    agency: 'Nhà môi giới',

    loginScreen: 'Đăng nhập',
    registerScreen: 'Đăng ký',
    forgotScreen: 'Quên mật khẩu'
  }
});

setLanguage(strings);
module.exports = strings;
