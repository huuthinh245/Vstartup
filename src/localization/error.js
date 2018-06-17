import LocalizedStrings from 'react-native-localization';
import setLanguage from './setLanguage';

const strings = new LocalizedStrings({
  eng: {
    emptyListFavorite: 'You have not any favorite realty.',
    emptyListContact: 'You have not any contact.',
    emptyListHistory: 'You have not any search keyword.',
    emptyListSearch: 'No have any result, please adjust the filters or change location.',
    emptyListAgencyRealty: 'Agency have not yet posted any realty.',
    emptyListMyRealty: 'You have not yet posted any realty.',
    emptyAgency: 'No agency found.',

    titleEmpty: 'Please enter title of this realty.',
    ownedProjectEmpty: 'Please select owned project of this realty.',
    priceEmpty: 'Please enter price.',
    widthEmpty: 'Please enter width.',
    heightEmpty: 'Please enter height.',
    areaEmpty: 'Please enter area.',
    cityEmpty: 'Please select city.',
    districtEmpty: 'Please select district.',
    addressEmpty: 'Please enter address.',
    imagesEmpty: 'Please upload at least 1 image.',
    contactNameEmpty: 'Please enter your name.',
    contactEmailEmpty: 'Your email has invalid.',
    contactPhoneEmpty: 'Your phone has invalid.'
  },
  vni: {
    emptyListFavorite: 'Bạn chưa có tin bất động sản yêu thích nào.',
    emptyListContact: 'Bạn chưa có liên hệ nào.',
    emptyListHistory: 'Bạn chưa có từ khoá tìm kiếm nào.',
    emptyListSearch:
      'Không có kết quả tìm kiếm phù hợp, vui lòng chỉnh lại bộ lọc hoặc thay đổi vị trí.',
    emptyListAgencyRealty: 'Nhà môi giới chưa đăng bán bất động sản nào.',
    emptyListMyRealty: 'Bạn chưa đăng bán bất động sản nào.',
    emptyAgency: 'Không tìm thấy nhà môi giới.',

    titleEmpty: 'Vui lòng nhập tiêu đề của bất động sản.',
    ownedProjectEmpty: 'Vui lòng chọn dự án sở hữu của bất động sản này.',
    priceEmpty: 'Giá không đươc để trống.',
    widthEmpty: 'Chiều rộng không được để trống.',
    heightEmpty: 'Chiều dài không được để trống.',
    areaEmpty: 'Diện tích không được để trống.',
    cityEmpty: 'Vui lòng chọn tỉnh/thành phố.',
    districtEmpty: 'Vui lòng chọn quận/huyện.',
    addressEmpty: 'Vui lòng nhập địa chỉ.',
    imagesEmpty: 'Vui lòng tải lên ít nhất 1 hình ảnh của bất động sản.',
    contactNameEmpty: 'Vui lòng nhập tên bạn.',
    contactEmailEmpty: 'Email không đúng định dạng.',
    contactPhoneEmpty: 'Số điện thoại không đúng định dạng.'
  }
});

setLanguage(strings);
module.exports = strings;
