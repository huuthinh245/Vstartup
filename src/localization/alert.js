import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    restart: 'Try restart application',
    rs: 'Restart',
    requireRestart: 'Restart application to change settings',
    maxCountImages: 'Maximum images',
    requireRemoveImage:
      'You only can upload 10 images at once, please remove some image before select other image.',

    deleteSuccess: 'Delete successfully.',
    delete: 'Confirm delete',
    confirmDelete: 'Are you sure to delete ?',
    ok: 'OK',
    cancel: 'Cancel',

    invalidField: 'Invalid data',
    emailInvalid: 'Email invalid',
    passwordTooShort: 'Passwords must be at least 6 characters',
    passwordNotTheSame: 'Password is not the same',
    emptyField: 'Field cannot be empty',
    nameEmpty: 'Field name is require',
    phoneEmpty: 'Field phone is require',
    addressEmpty: 'Field address is require',
    deviceOffline: 'No network connection.',
    phoneInvalid: 'Incorrect phone number',

    updateInfoSuccess: 'Update information successfully !',
    registerSuccess: 'Register account successfully !',
    postContactSuccess: 'Send contact successfully !'
  },
  vni: {
    error: 'Lỗi',
    success: 'Thành công',
    warning: 'Cảnh báo',
    restart: 'Thử khởi động lại ứng dụng',
    rs: 'Khởi động lại',
    requireRestart: 'Khởi động lại ứng dụng để áp dụng cài đặt',
    maxCountImages: 'Số lượng ảnh tối đa',
    requireRemoveImage:
      'Bạn chỉ có thể upload tối đa 10 hình trong 1 lần, vui lòng xoá bớt để chọn lại.',

    deleteSuccess: 'Xoá thành công.',
    delete: 'Xác nhận xoá',
    confirmDelete: 'Bạn chắc chắn muốn xoá ?',
    ok: 'OK',
    cancel: 'Huỷ',

    invalidField: 'Dữ liệu lỗi',
    emailInvalid: 'Email không đúng định dạng',
    passwordTooShort: 'Mật khẩu cần ít nhất 6 ký tự',
    passwordNotTheSame: 'Mật khẩu không trùng khớp',
    emptyField: 'Trường không được bỏ trống',
    nameEmpty: 'Tên không được bỏ trống',
    phoneEmpty: 'Số điện thoại không được bỏ trống',
    addressEmpty: 'Địa chỉ không được bỏ trống',
    deviceOffline: 'Không có kết nối internet.',
    phoneInvalid: 'Số điện thoại không đúng định dạng',

    updateInfoSuccess: 'Cập nhật tài khoản thành công !',
    registerSuccess: 'Đăng ký tài khoản thành công !',
    postContactSuccess: 'Gửi liên hệ thành công !'
  }
});

setLanguage(strings);
module.exports = strings;
