import React from 'react';
import { View, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

import { Empty } from '../components/flatlistHelpers';

import Header from '../navigators/headers/CommonHeader';
import errorStrings from '../localization/error';
import headerStrings from '../localization/header';
import * as routes from '../routes/routes';
import { _dims, LIMIT_SERVICES } from '../utils/constants';
import {
  getAgencyProjectAction,
  loadMoreAgencyProjectAction,
  refreshAgencyProjectAction
} from '../redux/agencyProject/actions';
import { styles } from '../components/AuthDetail';
import ProjectItem from '../components/ProjectItem';

class AgencyProject extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidMount() {
    const { user } = this.props.navigation.state.params;
    getAgencyProjectAction({ author_id: user.id });
  }

  _onLoadMore = () => {
    if (this.props.agencyProject.loadMore || this.onEndReachedCalledDuringMomentum) return;
    const { user } = this.props.navigation.state.params;
    const len = this.props.agencyProject.data[user.id].length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    loadMoreAgencyProjectAction({ author_id: user.id, page });
  };

  _onRefresh = () => {
    if (this.props.agencyProject.fetching || this.props.agencyProject.refreshing) return;
    const { user } = this.props.navigation.state.params;
    refreshAgencyProjectAction({ author_id: user.id });
  };

  _renderItem = ({ item }) => {
    return (
      <ProjectItem
        item={item}
        onPress={() => {
          this.props.navigation.navigate(routes.projectDetail, { data: item });
        }}
      />
    );
  };

  _renderFooter = () => {
    if (this.props.agencyProject.fetching || !this.props.agencyProject.loadMore) {
      return <View style={{ height: _dims.defaultPadding }} />;
    }
    return <ActivityIndicator animating style={styles.indicator} />;
  };

  _renderEmpty = () => {
    if (this.props.agencyProject.fetching) {
      return null;
    }
    return <Empty title={errorStrings.emptyListAgencyRealty} />;
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Header
          title={headerStrings.agencyProject}
          onLeftPress={() => this.props.navigation.goBack()}
        />
        {this.props.agencyProject.fetching ? (
          <ActivityIndicator animating style={styles.indicator} />
        ) : (
          <FlatList
            style={{ paddingHorizontal: _dims.defaultPadding, backgroundColor: '#fff' }}
            data={this.props.agencyProject.data[this.props.navigation.state.params.user.id]}
            renderItem={this._renderItem}
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={this._renderEmpty}
            ListHeaderComponent={() => <View style={{ height: _dims.defaultPadding }} />}
            ListFooterComponent={this._renderFooter}
            onEndReached={this._onLoadMore}
            onEndReachedThreshold={0}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            refreshing={this.props.agencyProject.refreshing}
            onRefresh={this._onRefresh}
          />
        )}
      </View>
    );
  }
}

export default connect(state => ({ agencyProject: state.agencyProject }))(AgencyProject);
