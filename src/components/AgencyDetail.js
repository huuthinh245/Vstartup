import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { _dims, responsiveFontSize, _colors, width, height } from '../utils/constants';
/*eslint-disable*/
const starFocus = require('../assets/images/starFocus.png');
const star = require('../assets/images/star.png');
const w = width / 2;
const h = height / 3;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: _dims.defaultPadding, 
    marginHorizontal: _dims.defaultPadding,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: _colors.overlay,
    height: h / 3,
    width: w - (_dims.defaultPadding * 2),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  avatar: {
    width: w - (_dims.defaultPadding * 2), 
    height: h,
    borderRadius: 15
  },
  name: {
    color: '#fff',
    fontSize: responsiveFontSize(_dims.defaultFontSize)
  },
  phone: {
    color: '#fff',
    fontSize: responsiveFontSize(_dims.defaultFontSize)
  }
});

class AgencyDetail extends Component {
  renderRating = (rating) => {

    let rate =[];
    let unRate= [];
    for (let i = 0; i < rating; i++) {
      rate.push(i);
    }
    for (let i = 0; i < 5-rating; i++) {
      unRate.push(i);
    }
    return (
      <View style={{ flexDirection: 'row', marginVertical: 5 }}>
      {rate.map(index => <Image source={starFocus} style={{ width: 15, height: 15 }} key={index}/>)}
      {unRate.map(index => <Image source={star} style={{ width: 15, height: 15 }} key={index}/>)}
      </View>
    );
  }

  render() {
    const { avatar, name, phone, rating } = this.props.item;
    return (
      <TouchableOpacity style={styles.wrapper}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.overlay} >
          <Text style={styles.name}>{name}</Text>
            {this.renderRating(rating)}
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default AgencyDetail;

