import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import PlaceHolder from '../components/flatlistHelpers/PlaceHolder_Detail';

class ListInvestor extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Header
          onLeftPress={() => this.props.navigation.goBack()}
          title={headerStrings.listInvestor}
        />
        <PlaceHolder />
      </View>
    );
  }
}

export default connect()(ListInvestor);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1, 
    backgroundColor: '#fff'
  }

});
