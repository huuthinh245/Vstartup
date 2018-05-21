import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    error: 'Error',
    success: 'Success',
    warning: 'Warning',

    ok: 'OK',
    cancel: 'Cancel',

    emailInvalid: 'Email invalid',
    passwordTooShort: 'Passwords must be at least 6 characters',
    passwordNotTheSame: 'Password is not the same',
    deviceOffline: 'No network connection.'
  },
  vni: {
    error: 'Lỗi',
    success: 'Thành công',
    warning: 'Cảnh báo',

    ok: 'OK',
    cancel: 'Huỷ',

    emailInvalid: 'Email không đúng định dạng',
    passwordTooShort: 'Mật khẩu cần ít nhất 6 ký tự',
    passwordNotTheSame: 'Mật khẩu không trùng khớp',
    deviceOffline: 'Không có kết nối internet.'
  }
});

setLanguage(strings);
module.exports = strings;
