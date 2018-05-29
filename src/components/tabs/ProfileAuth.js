
// /*eslint-disable*/
import React, {
  Component
} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';

import {
  connect
} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { _dims, responsiveFontSize, _colors } from '../../utils/constants';
import Profile from '../ProfileItem';
import _string from '../../localization/profile';

const dataUser = {
  id: 1,
  name: 'Tran Thuy Vy',
  rating: 5,
  avatar:
      'https://images.pexels.com/photos/658687/pexels-photo-658687.jpeg?auto=compress&cs=tinysrgb&h=350',
  phone: '0903 113 113',
  email: 'tranthuyvi@gmail.com',
  address: 'Trung Mỹ Tây, Quận 12, Hồ Chí Minh, Việt Nam'
};
  
const arr = [
  {
    id: 1,
    title: 'Can ho',
    photo: 'https://images.pexels.com/photos/658687/pexels-photo-658687.jpeg?auto=compress&cs=tinysrgb&h=350',
    price: '841 $',
    address: 'Bệnh viện Q.12'
  },
  {
    id: 2,
    title: 'Can ho',
    photo: 'https://images.pexels.com/photos/658687/pexels-photo-658687.jpeg?auto=compress&cs=tinysrgb&h=350',
    price: '8464 $',
    address: 'Bệnh viện Q.12'
  },
  {
    id: 3,
    title: 'Can ho',
    photo: 'https://images.pexels.com/photos/658687/pexels-photo-658687.jpeg?auto=compress&cs=tinysrgb&h=350',
    price: '8469 $',
    address: 'Bệnh viện Q.12'
  }
];
  
  
const styleSh = StyleSheet.create({
  name: {
    fontSize: responsiveFontSize(25),
    marginVertical: 10
  },
  phone: {
    color: '#fff',
    fontSize: responsiveFontSize(_dims.defaultFontSize)
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  devine: {
    flex: 1,
    height: 1,
    backgroundColor: 'silver',
    marginHorizontal: 20
  },
  itemText: {
    fontSize: responsiveFontSize(_dims.defaultFontSize),
    marginLeft: 10
  },
  title: {
    fontSize: responsiveFontSize(16),
    marginHorizontal: _dims.defaultPadding,
    color: _colors.mainColor
  },
  titleItem: {
    fontSize: responsiveFontSize(_dims.defaultFontTitle),
  },
  priceItem: {
    fontSize: responsiveFontSize(_dims.defaultFontSize),
    color: _colors.mainColor
  },
  addressItem: {
    fontSize: responsiveFontSize(_dims.defaultFontSize),
  },
  wrapperInfo: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: _dims.defaultPadding,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: Platform.OS === 'ios' ? 2 : 6,
  },
  buttonText: {
    fontSize: responsiveFontSize(_dims.defaultFontSubTitle),
    margin: 10,
    color: '#fff'
  },
  buttonStyle: {
    marginVertical: 20,
    backgroundColor: _colors.mainColor,
    alignSelf: 'center',
  },
  track: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#3acce1',
    backgroundColor: '#fff',
  },
});
  
class ProfileAuth extends Component {
    _renderItem = ({ item }) => {
      return (
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <View>
            <Image source={{ uri: item.photo }} style={{ width: 100, height: 100 }} />
          </View>
          <View style={{ justifyContent: 'center', marginLeft: 10 }}>
            <Text style={styleSh.titleItem}>{item.title}</Text>
            <Text style={styleSh.priceItem}>{item.price}</Text>
            <Text style={styleSh.addressItem}>{item.address}</Text>
          </View>
        </View>
      );
    }
    _renderHeader = () => {
      return (
        <View style={{ flexDirection: 'row', marginHorizontal: _dims.defaultPadding }}>
          <Text style={{ flex: 1, color: _colors.mainColor }}>Dự án(17)</Text>
          <TouchableOpacity
            style={{ justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'gray' }}
            onPress={() => { }}
          >
            <Text style={{ margin: 10, color: '#fff' }}>{_string.allProject}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  
    render() {
      return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ justifyContent: 'center', marginHorizontal: _dims.defaultPadding, marginVertical: 10 }}>
          <Profile user={dataUser} />
          <View style={{ marginHorizontal: _dims.defaultPadding, marginVertical: 20 }}>
            <Text style={styleSh.title}>{_string.contactWith}</Text>
          </View>
          <View style={styleSh.wrapperInfo}>
            <View style={styleSh.item}>
              <Icon name="ios-person-outline" size={25} color={_colors.mainColor} />
              <TextInput placeholder={_string.name} style={{ flex: 1 }} />
            </View>
            <View style={styleSh.devine} />
            <View style={styleSh.item}>
              <Icon name="ios-mail-outline" size={25} color={_colors.mainColor} />
              <TextInput placeholder={_string.mail} style={{ flex: 1 }} />
            </View>
            <View style={styleSh.devine} />
            <View style={styleSh.item}>
              <Icon name="ios-call-outline" size={25} color={_colors.mainColor} />
              <TextInput placeholder={_string.phone} style={{ flex: 1 }} />
            </View>
            <View style={styleSh.devine} />
            <TouchableOpacity
              style={styleSh.buttonStyle}
              onPress={() => { }}
            >
              <Text style={styleSh.buttonText}>{_string.sendInfo}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            ListHeaderComponent={() => this._renderHeader()}
            style={{ flex: 1, marginVertical: 20 }}
            keyExtractor={(item) => item.id.toString()}
            data={arr}
            renderItem={this._renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 0.5, flex: 1, backgroundColor: _colors.mainColor, marginHorizontal: _dims.defaultPadding }} />}
          />
        </ScrollView>
      );
    }
}
  
export default connect()(ProfileAuth);
  