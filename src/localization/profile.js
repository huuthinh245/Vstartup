import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    name: 'name',
    mail: 'mail',
    phone: 'phone number',
    contactWith: 'Contact with agency',
    unset: 'Not added yet'
  },
  vni: {
    name: 'họ và tên',
    mail: 'mail',
    phone: 'số điện thoại',
    contactWith: 'Liên lạc với nhà môi giới',
    unset: 'Chưa bổ sung'
  }
});

setLanguage(strings);
module.exports = strings;
