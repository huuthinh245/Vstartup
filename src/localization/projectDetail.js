import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    describe: 'Describe',
    utils: 'Utilities',
    investors: 'Investors',
    location: 'Project location',
    video: 'Video',
    name: 'Full name',
    email: 'Email',
    phone: 'Phone',
    submit: 'Send information',
    contactAgency: 'Contact Agency',
    bedroom: 'Bed room',
    bathroom: 'Bath room',
    area: 'Area'
  },
  vni: {
    describe: 'Mô tả',
    utils: 'Tiện ích',
    investors: 'Nhà đầu tư',
    location: 'Vị trí dự án',
    video: 'Video',
    name: 'Họ tên',
    email: 'Email',
    phone: 'Số điện thoại',
    submit: 'Gửi thông tin',
    contactAgency: 'Liên hệ nhà môi giới',
    bedroom: 'Phòng ngủ',
    bathroom: 'Phòng tắm',
    area: 'Diện tích'
  }
});

setLanguage(strings);
module.exports = strings;
