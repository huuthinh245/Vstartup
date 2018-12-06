import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    filter: 'Filter',
    price: 'Price',
    area: 'Area',
    bedroom: 'Bedrooms',
    bathroom: 'Bathrooms',
    toilet: 'Toilet',
    utils: 'Utilities',
    projectType: 'Type of project',
    show: 'Show results',
    default: 'Default',
    billion: 'billion',
    square: 'm²',
    moreThanFive: 'More than 5',
    pleaseSelect: '--- Select ---',
    clear: 'Clear filters',
    cancel: 'Cancel filters',
    done: 'Done'
  },
  vni: {
    filter: 'Lọc',
    price: 'Giá',
    area: 'Diện tích',
    bedroom: 'Phòng ngủ',
    bathroom: 'Phòng tắm',
    toilet: 'Toilet',
    utils: 'Tiện ích',
    projectType: 'Loại dự án',
    show: 'Xem kết quả',
    default: 'Mặc định',
    billion: 'tỷ',
    square: 'm²',
    moreThanFive: 'Nhiều hơn 5',
    pleaseSelect: '--- Lựa chọn ---',
    clear: 'Chọn lại',
    cancel: 'Bỏ bộ lọc',
    done: 'Đóng'
  }
});

setLanguage(strings);
module.exports = strings;
