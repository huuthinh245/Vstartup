import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    price: 'Price',
    area: 'Area',
    bedroom: 'Bedrooms',
    bathroom: 'Bathrooms',
    utils: 'Utilities',
    projectType: 'Type of project',
    show: 'Show results',
    default: 'Default'
  },
  vni: {
    price: 'Giá',
    area: 'Diện tích',
    bedroom: 'Phòng ngủ',
    bathroom: 'Phòng tắm',
    utils: 'Tiện ích',
    projectType: 'Loại dự án',
    show: 'Xem kết quả',
    default: 'Mặc định'
  }
});

setLanguage(strings);
module.exports = strings;
