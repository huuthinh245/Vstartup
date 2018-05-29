import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    name: 'name',
    mail: 'mail',
    phone: 'phone number',
    contactWith: 'Contact with agency',
    unset: 'Not added yet',
    showProj: 'All projects'
  },
  vni: {
    name: 'họ và tên',
    mail: 'mail',
    phone: 'số điện thoại',
    contactWith: 'Liên lạc với nhà môi giới',
    unset: 'Chưa bổ sung',
    showProj: 'Tất cả dự án'
  }
});

setLanguage(strings);
module.exports = strings;
