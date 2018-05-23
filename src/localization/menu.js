import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    project: 'Project',
    agency: 'Agency',
    investor: 'Investor',
    realty: 'Realty',
    rating: 'Rating application',
    feedback: 'Feedback',
    settings: 'Settings'
  },
  vni: {
    project: 'Dự án',
    agency: 'Môi giới',
    realty: 'Nhà đất',
    investor: 'Đầu tư',
    rating: 'Đánh giá ứng dụng',
    feedback: 'Phản hồi',
    settings: 'Cài đặt'
  }
});

setLanguage(strings);
module.exports = strings;
