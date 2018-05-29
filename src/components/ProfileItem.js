import React, { Component } from 'react';
import { View, Text, Image, Platform, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { width, _dims, responsiveFontSize, _colors } from '../utils/constants';


const w = width / 2;
const starFocus = require('../assets/images/starFocus.png');

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    marginHorizontal: _dims.defaultPadding,
  },
  avatar: {
    width: w, 
    height: w,
    borderRadius: 15
  },
  name: {
    fontSize: responsiveFontSize(_dims.defaultFontTitle),
    marginVertical: 10
  },
  phone: {
    color: '#fff',
    fontSize: responsiveFontSize(_dims.defaultFontSize)
  },
  item: {
    flex: 1,
    flexDirection: 'row', 
    marginVertical: 20,
    marginHorizontal: 20,
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
    color: _colors.mainColor,
    fontSize: responsiveFontSize(_dims.defaultFontSize),
  },
  wrapperInfo: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: Platform.OS === 'ios' ? 2 : 6,
    backgroundColor: '#fff',
    borderRadius: 10
  }
});

class Screen extends Component {
renderRating = (rating) => {
  const rate = [];
  for (let i = 0; i < rating; i += 1) {
    rate.push(i);
  }
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      {rate.map(index => <Image source={starFocus} style={{ width: 15, height: 15 }} key={index} />)}
    </View>
  );
}
render() {
  const {
    name, rating, phone, email, address, avatar } = this.props.user;
  return (
    <View style={styles.wrapper}>
      <View style={{ alignItems: 'center' }}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <Text style={styles.name}>{name}</Text>
          {this.renderRating(rating)}
        </View>
      </View>
      <View style={styles.wrapperInfo}>
        <View style={styles.item}>
          <Icon name="crop-square" size={15} color={_colors.mainColor} iconStyle={{ backgroundColor: _colors.mainColor }} />
          <Text style={styles.itemText}>{phone}</Text>
        </View>
        <View style={styles.devine} />
        <View style={styles.item}>
          <Icon name="crop-square" size={15} color={_colors.mainColor} iconStyle={{ backgroundColor: _colors.mainColor }} />
          <Text style={styles.itemText} numberOfLines={1} >{email}</Text>
        </View>
        <View style={styles.devine} />
        <View style={styles.item}>
          <Icon name="crop-square" size={15} color={_colors.mainColor} iconStyle={{ backgroundColor: _colors.mainColor }} />
          <Text style={styles.itemText} numberOfLines={1} >{address}</Text>
        </View>
      </View>
    </View>
  );
}
}

export default Screen;