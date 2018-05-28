import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { responsiveFontSize, _dims, responsiveHeight, _colors } from '../utils/constants';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import strings from '../localization/authorization';
import AgencyItem from '../components/AgencyItem';

export default class AdditionalInformation extends React.Component {
  _renderItem = ({ item, index }) => {
    const style =
      index % 2 === 0
        ? { marginRight: _dims.defaultPadding / 2 }
        : { marginLeft: _dims.defaultPadding / 2 };
    return <AgencyItem data={item} style={style} />;
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <Header onLeftPress={() => this.props.navigation.goBack()} title="Danh sach agency" />
        <FlatList
          style={{ marginHorizontal: _dims.defaultPadding }}
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          keyExtractor={item => `${item}`}
          renderItem={this._renderItem}
          numColumns={2}
          ListFooterComponent={() => <View style={{ height: _dims.defaultPadding }} />}
          ListHeaderComponent={() => <View style={{ height: _dims.defaultPadding }} />}
          ItemSeparatorComponent={() => <View style={{ height: _dims.defaultPadding }} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    marginVertical: _dims.defaultPadding * 2,
    marginLeft: _dims.defaultPadding
  },
  innerWrapper: {
    padding: _dims.defaultPadding
  },
  hoishiWrapper: {
    borderBottomWidth: 1,
    borderColor: _colors.mainColor,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: responsiveHeight(3)
  },
  hoishiIcon: {
    color: _colors.mainColor,
    fontSize: responsiveFontSize(_dims.defaultFontSize + 7),
    alignSelf: 'center'
  },
  hoishiInput: {
    flex: 1,
    paddingLeft: _dims.defaultPadding
  }
});
