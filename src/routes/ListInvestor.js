import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { responsiveFontSize, _dims, responsiveHeight, _colors } from '../utils/constants';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import AgencyItem from '../components/AgencyItem';
import * as routes from './routes';

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
        <Header
          onLeftPress={() => this.props.navigation.goBack()}
          title={headerStrings.listAgency}
        />
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
    paddingVertical: 10,
    paddingLeft: _dims.defaultPadding
  }
});
