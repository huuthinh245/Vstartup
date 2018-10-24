import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

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
import { Empty, PlaceHolder } from '../components/flatlistHelpers';

const indicator = {
  alignSelf: 'center',
  bottom: 10,
  position: 'absolute',
  zIndex: 100
};

class AgencyProject extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidMount() {
    const { user } = this.props.navigation.state.params;
    getAgencyProjectAction({ agencyId: user.id });
  }

  _onLoadMore = () => {
    if (
      this.props.agencyProject.loadMore ||
      this.onEndReachedCalledDuringMomentum
    ) {
      return;
    }
    const { user } = this.props.navigation.state.params;
    const len = this.props.agencyProject.data[user.id].length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    loadMoreAgencyProjectAction({ agencyId: user.id, page });
  };

  _onRefresh = () => {
    if (
      this.props.agencyProject.fetching ||
      this.props.agencyProject.refreshing
    ) {
      return;
    }
    const { user } = this.props.navigation.state.params;
    refreshAgencyProjectAction({ agencyId: user.id });
  };

  _renderItem = ({ item }) => {
    return (
      <ProjectItem
        isMine={
          this.props.auth.id === this.props.navigation.state.params.user.id
        }
        item={item}
        onPress={() => {
          this.props.navigation.navigate(routes.projectDetail, { data: item });
        }}
      />
    );
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
          <PlaceHolder />
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              data={
                this.props.agencyProject.data[
                  this.props.navigation.state.params.user.id
                ]
              }
              renderItem={this._renderItem}
              keyExtractor={item => `${item.id}`}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListEmptyComponent={this._renderEmpty}
              ListHeaderComponent={() => (
                <View style={{ height: _dims.defaultPadding }} />
              )}
              ListFooterComponent={() => (
                <View style={{ height: _dims.defaultPadding }} />
              )}
              onEndReached={this._onLoadMore}
              onEndReachedThreshold={0.1}
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = false;
              }}
              refreshing={this.props.agencyProject.refreshing}
              onRefresh={this._onRefresh}
            />
            {this.props.agencyProject.loadMore && (
              <ActivityIndicator animating style={indicator} />
            )}
          </View>
        )}
      </View>
    );
  }
}

export default connect(state => ({
  agencyProject: state.agencyProject,
  auth: state.auth.user
}))(AgencyProject);
