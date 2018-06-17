import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    name: 'name',
    mail: 'mail',
    phone: 'phone number',
    contactWith: 'Contact with agency',
    unset: 'Not added yet',
    showProj: 'All realty',
    editAccount: 'Edit your account',
    changePassword: 'Change passwod',
    logOut: 'Logout',
    areYouSure: 'Are you sure to logout ?',
    hideRealty: 'Hide this realty',
    editRealty: 'Edit this realty',
    actionTitle: 'Upload avatar',
    actionCamera: 'Take a photo',
    actionPhoto: 'Select from library',
    cancel: 'Cancel',
    manageContact: 'Manage contacts',
    manageProject: 'All projects',
    sendContact: 'Send contact'
  },
  vni: {
    name: 'họ và tên',
    mail: 'mail',
    phone: 'số điện thoại',
    contactWith: 'Liên lạc với nhà môi giới',
    unset: 'Chưa bổ sung',
    showProj: 'Tất cả tin bất động sản',
    editAccount: 'Chỉnh sửa tài khoản',
    changePassword: 'Đổi mật khẩu',
    logOut: 'Đăng xuất',
    areYouSure: 'Bạn chắc chắn muốn đăng xuất ?',
    hideRealty: 'Ẩn tin',
    editRealty: 'Chỉnh sửa tin',
    actionTitle: 'Tải ảnh lên',
    actionCamera: 'Chụp ảnh',
    actionPhoto: 'Thư viện ảnh',
    cancel: 'Huỷ',
    manageContact: 'Quản lý liên hệ',
    manageProject: 'Tất cả dự án',
    sendContact: 'Gửi thông tin'
  }
});

setLanguage(strings);
module.exports = strings;
