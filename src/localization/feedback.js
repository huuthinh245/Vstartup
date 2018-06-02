import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    nameLabel: 'Your name',
    emailLabel: 'Your email',
    phoneLabel: 'Your phone number',
    namePlaceholder: 'Enter your name',
    emailPlaceholder: 'Enter your email',
    phonePlaceholder: 'Enter your phone',
    thinking: 'What do you think about us ?',
    submit: 'Submit'
  },
  vni: {
    nameLabel: 'Họ tên',
    emailLabel: 'Email',
    phoneLabel: 'Điện thoại',
    namePlaceholder: 'Nhập tên bạn',
    emailPlaceholder: 'Nhập email',
    phonePlaceholder: 'Nhập số điện thoại',
    thinking: 'Bạn nghĩ gì về chúng tôi ?',
    submit: 'Gửi'
  }
});

setLanguage(strings);
module.exports = strings;
