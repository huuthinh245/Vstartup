import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    name: 'Title',
    ownedByProject: 'Project owned',
    projectType: 'Realty type',
    price: 'Price',
    priceUnit: 'Price unit',
    width: 'Width',
    length: 'Length',
    direction: 'Direction',
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
    cancel: 'Cancel',
    moreThanFive: 'More than 5',
    select: '--- Please select ---',
    uploadImage: 'Upload images',
    image: 'Illustrating images',
    youtube: 'Youtube link'
  },
  vni: {
    name: 'Tiêu đề',
    ownedByProject: 'Thuộc dự án',
    projectType: 'Loại bđs',
    price: 'Giá',
    priceUnit: 'Đơn vị giá',
    width: 'Chiều rộng',
    length: 'Chiều dài',
    direction: 'Hướng',
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
    cancel: 'Huỷ',
    moreThanFive: 'Nhiều hơn 5',
    select: '--- Vui lòng chọn ---',
    uploadImage: 'Tải ảnh lên',
    image: 'Hình ảnh minh hoạ',
    youtube: 'Youtube link'
  }
});

setLanguage(strings);
module.exports = strings;
