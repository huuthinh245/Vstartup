import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    restart: 'Try restart application',

    ok: 'OK',
    cancel: 'Cancel',

    invalidField: 'Invalid data',
    emailInvalid: 'Email invalid',
    passwordTooShort: 'Passwords must be at least 6 characters',
    passwordNotTheSame: 'Password is not the same',
    nameEmpty: 'Field name is require',
    phoneEmpty: 'Field phone is require',
    addressEmpty: 'Field address is require',
    deviceOffline: 'No network connection.',

    registerSuccess: 'Register account successfully !'
  },
  vni: {
    error: 'Lỗi',
    success: 'Thành công',
    warning: 'Cảnh báo',
    restart: 'Thử khởi động lại ứng dụng',

    ok: 'OK',
    cancel: 'Huỷ',

    invalidField: 'Dữ liệu lỗi',
    emailInvalid: 'Email không đúng định dạng',
    passwordTooShort: 'Mật khẩu cần ít nhất 6 ký tự',
    passwordNotTheSame: 'Mật khẩu không trùng khớp',
    nameEmpty: 'Tên không được bỏ trống',
    phoneEmpty: 'Số điện thoại không được bỏ trống',
    addressEmpty: 'Địa chỉ không được bỏ trống',
    deviceOffline: 'Không có kết nối internet.',

    registerSuccess: 'Đăng ký tài khoản thành công !'
  }
});

setLanguage(strings);
module.exports = strings;
