import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    name: 'name',
    mail: 'mail',
    phone: 'phone number',
    contactWith: 'Contact with agency',
    allProject: 'All project',
    sendInfo: 'send information'
  },
  vni: {
    name: 'họ và tên',
    mail: 'mail',
    phone: 'số điện thoại',
    contactWith: 'Liên lạc với nhà môi giới',
    allProject: 'tất cả dự án',
    sendInfo: 'gửi thông tin'
  },

});

setLanguage(strings);
module.exports = strings;
