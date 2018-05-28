import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import strings from '../localization/profile';
import AirbnbRating from '../components/rating';
import { responsiveFontSize, _dims, _colors } from '../utils/constants';

class AgencyDetail extends React.Component {
  _renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <FastImage
          style={styles.itemImage}
          source={{
            uri: 'https://i.imgur.com/UYiroysl.jpg',
            priority: FastImage.priority.high
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.itemInfo}>
          <Text numberOfLines={1} style={styles.itemName}>
            can ho chung cu
          </Text>
          <Text numberOfLines={1} style={styles.itemPrice}>
            845 trieu
          </Text>
          <Text numberOfLines={1} style={styles.itemAddress}>
            dong khoi quan 1
          </Text>
        </View>
      </View>
    );
  };

  _renderHeader = () => {
    const { user } = this.props.auth;
    return (
      <View>
        <FastImage
          style={styles.image}
          source={{
            uri: user.avatar,
            priority: FastImage.priority.high
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.name}>{user.name}</Text>
        <AirbnbRating
          count={4}
          size={responsiveFontSize(_dims.defaultFontSubTitle)}
          showRating={false}
        />
        <View style={styles.infoWrapper}>
          <View style={styles.line}>
            <Ionicons name="ios-call" style={styles.lineIcon} />
            <Text style={[styles.lineText, !user.phone && { color: 'silver' }]}>
              {user.phone || strings.unset}
            </Text>
          </View>
          <View style={styles.line}>
            <Ionicons name="ios-mail" style={styles.lineIcon} />
            <Text style={styles.lineText}>{user.email}</Text>
          </View>
          <View style={[styles.line, styles.noBorderBottom]}>
            <Ionicons name="md-pin" style={styles.lineIcon} />
            <Text style={[styles.lineText, !user.address && { color: 'silver' }]}>
              {user.address || strings.unset}
            </Text>
          </View>
        </View>

        <Text style={styles.showProj}>Tat ca du an</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.fab} onPress={() => {}}>
          <Ionicons
            name="ios-add-circle"
            color="#65b6fb"
            size={responsiveFontSize(_dims.defaultFontSize * 4)}
          />
        </TouchableOpacity>

        <FlatList
          style={{ marginHorizontal: _dims.defaultPadding }}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          renderItem={this._renderItem}
          keyExtractor={item => `${Math.random()}`}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={this._renderHeader}
        />
      </View>
    );
  }
}

export default connect(state => ({ auth: state.auth }))(AgencyDetail);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fbfbfb'
  },
  fab: {
    zIndex: 100,
    position: 'absolute',
    bottom: _dims.defaultPadding,
    right: _dims.defaultPadding
  },
  infoWrapper: {
    margin: _dims.defaultPadding,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: _dims.defaultPadding * 2,
    paddingVertical: _dims.defaultPadding,
    shadowColor: '#777',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  name: {
    alignSelf: 'center',
    fontSize: responsiveFontSize(_dims.defaultFontTitle),
    fontWeight: 'bold',
    marginBottom: 5
  },
  image: {
    width: _dims.screenWidth / 2,
    height: _dims.screenWidth / 2,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: _dims.defaultPadding
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: 'silver'
  },
  lineIcon: {
    fontSize: responsiveFontSize(_dims.defaultFontSubTitle + 4),
    color: _colors.mainColor,
    marginLeft: -_dims.defaultPadding / 2,
    marginRight: _dims.defaultPadding * 2
  },
  lineText: {
    flex: 1,
    color: '#555'
  },
  noBorderBottom: {
    borderBottomWidth: 0
  },
  showProj: {
    marginLeft: _dims.defaultPadding * 2,
    color: _colors.mainColor,
    marginTop: _dims.defaultPadding * 2,
    marginBottom: _dims.defaultPadding
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemImage: {
    width: (_dims.screenWidth - _dims.defaultPadding * 2) / 4,
    height: (_dims.screenWidth - _dims.defaultPadding * 2) / 4,
    borderRadius: 20
  },
  itemInfo: {
    flex: 1,
    marginLeft: _dims.defaultPadding
  },
  itemName: {
    color: '#333'
  },
  itemPrice: {
    color: '#44cee2',
    fontWeight: 'bold'
  },
  itemAddress: {
    color: '#777'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#44cee2',
    marginVertical: 5,
    marginHorizontal: _dims.defaultPadding
  }
});
