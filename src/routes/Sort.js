import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, PixelRatio } from 'react-native';
import { connect } from 'react-redux';

import { _dims } from '../utils/constants';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';

class Sort extends React.Component {
  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemWrapper}
      onPress={() => {
        this.props.navigation.goBack();
        this.props.navigation.state.params.onDone(item);
      }}
    >
      <Text style={styles.text}>{item}</Text>
    </TouchableOpacity>
  );
  render() {
    return (
      <View style={styles.wrapper}>
        <Header
          onLeftPress={() => this.props.navigation.goBack()}
          title={headerStrings.sortScreen}
        />
        <FlatList
          style={styles.list}
          data={[1, 2, 3, 4]}
          renderItem={this._renderItem}
          keyExtractor={item => `${item}`}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  }
}

export default connect(state => ({ listSort: state.listSort }))(Sort);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  list: {
    marginHorizontal: _dims.defaultPadding
  },
  itemWrapper: {
    padding: _dims.defaultPadding
  },
  text: {
    color: '#333'
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: 'silver'
  }
});
