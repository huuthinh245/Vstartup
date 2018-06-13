import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    describe: 'Describe',
    utils: 'Utilities',
    investors: 'Investors',
    location: 'Realty location',
    video: 'Video',
    name: 'Full name',
    email: 'Email',
    phone: 'Phone',
    submit: 'Send information',
    contactAgency: 'Contact Agency',
    bedroom: 'bedroom',
    bathroom: 'bathroom',
    area: 'area',
    hideRealty: 'Hide realty',
    editRealty: 'Edit realty',
    cancel: 'Cancel'
  },
  vni: {
    describe: 'Mô tả',
    utils: 'Tiện ích',
    investors: 'Nhà đầu tư',
    location: 'Vị trí BĐS',
    video: 'Video',
    name: 'Họ tên',
    email: 'Email',
    phone: 'Số điện thoại',
    submit: 'Gửi thông tin',
    contactAgency: 'Liên hệ nhà môi giới',
    bedroom: 'phòng ngủ',
    bathroom: 'phòng tắm',
    area: 'diện tích',
    hideRealty: 'Ẩn tin',
    editRealty: 'Chỉnh sửa tin',
    cancel: 'Huỷ'
  }
});

setLanguage(strings);
module.exports = strings;
