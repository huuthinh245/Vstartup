import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { responsiveFontSize, _dims, responsiveHeight, _colors } from '../utils/constants';

export default class ProjectItem extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <View style={styles.wrapper}>
        {this.props.edit && (
          <TouchableOpacity
            onPress={this.props.onSelect}
            activeOpacity={0.8}
            style={styles.overlay}
          >
            {this.props.selected ? (
              <View style={[styles.check, styles.unchecked]} />
            ) : (
              <View style={[styles.check, styles.checked]}>
                <Ionicons
                  name="ios-checkmark"
                  color="#fff"
                  size={responsiveFontSize(_dims.defaultFontTitle + 6)}
                />
              </View>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={this.props.onPress}>
          <FastImage
            style={styles.image}
            source={{
              uri: data.thumb_map,
              priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
        <View style={styles.infoWrapper}>
          <Text style={styles.title} numberOfLines={2}>
            {data.address}
          </Text>
          <Text numberOfLines={3}>{data.filter}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 100,
    top: 0,
    left: 0,
    borderRadius: 10
  },
  check: {
    position: 'absolute',
    left: 5,
    top: 5,
    width: responsiveFontSize(_dims.defaultFontTitle + 4),
    height: responsiveFontSize(_dims.defaultFontTitle + 4),
    borderRadius: responsiveFontSize(_dims.defaultFontTitle + 4) / 2,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checked: {
    backgroundColor: _colors.mainColor
  },
  unchecked: {
    backgroundColor: 'transparent'
  },
  image: {
    height: responsiveHeight(18),
    width: responsiveHeight(18),
    borderRadius: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(_dims.defaultFontTitle),
    marginBottom: _dims.defaultPadding
  },
  infoWrapper: {
    marginLeft: _dims.defaultPadding,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  }
});
