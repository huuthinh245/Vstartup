import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    current: 'Current location',
    placeholder: 'Search address'
  },
  vni: {
    current: 'Vị trí hiện tại',
    placeholder: 'Tìm kiếm địa chỉ'
  }
});

setLanguage(strings);
module.exports = strings;
