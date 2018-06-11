import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    emptyListFavorite: 'You have not any favorite realty .',
    emptyListContact: 'You have not any contact .',
    emptyListHistory: 'You have not any search result .',
    emptyListSearch: 'No have any result, please adjust the filters or change location .',
    emptyListAgencyRealty: 'Agency have not yet posted any realty .',
    emptyListMyRealty: 'You have not yet posted any realty .'
  },
  vni: {
    emptyListFavorite: 'Bạn chưa có tin bất động sản yêu thích nào .',
    emptyListContact: 'Bạn chưa có liên hệ nào .',
    emptyListHistory: 'Bạn chưa có kết quả tìm kiếm nào .',
    emptyListSearch:
      'Không có kết quả tìm kiếm phù hợp, vui lòng chỉnh lại bộ lọc hoặc thay đổi vị trí .',
    emptyListAgencyRealty: 'Nhà môi giới chưa đăng bán bất động sản nào .',
    emptyListMyRealty: 'Bạn chưa đăng bán bất động sản nào .'
  }
});

setLanguage(strings);
module.exports = strings;
