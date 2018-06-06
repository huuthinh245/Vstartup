import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    name: 'Title',
    ownedByProject: 'Project owned',
    projectType: 'Project type',
    price: 'Price',
    priceUnit: 'Price unit',
    width: 'Width',
    height: 'Length',
    area: 'Area',
    address: 'Address',
    toilet: 'Toilet',
    bathroom: 'Bathroom',
    bedroom: 'Bed room',
    description: 'Description',
    utils: 'Utilities',
    contactName: 'Your name',
    contactEmail: 'Your email',
    contactPhone: 'Your phone number',
    submit: 'Submit',
    actionTitle: 'Upload avatar',
    actionCamera: 'Take a photo',
    actionPhoto: 'Select from library',
    cancel: 'Cancel'
  },
  vni: {
    name: 'Tiêu đề',
    ownedByProject: 'Thuộc dự án',
    projectType: 'Loại dự án',
    price: 'Giá',
    priceUnit: 'Đơn vị giá',
    width: 'Chiều rộng',
    height: 'Chiều dài',
    area: 'Diện tích',
    address: 'Địa chỉ',
    toilet: 'Toilet',
    bathroom: 'Phòng tắm',
    bedroom: 'Phòng ngủ',
    description: 'Mô tả chi tiết',
    utils: 'Tiện ích',
    contactName: 'Tên liên hệ',
    contactEmail: 'Email',
    contactPhone: 'Điện thoại',
    submit: 'Đăng tin',
    actionTitle: 'Tải ảnh lên',
    actionCamera: 'Chụp ảnh',
    actionPhoto: 'Thư viện ảnh',
    cancel: 'Huỷ'
  }
});

setLanguage(strings);
module.exports = strings;
