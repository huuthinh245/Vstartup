import React from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import errorStrings from '../localization/error';
import { Separator, Empty, PlaceHolder } from '../components/flatlistHelpers';
import { _dims, LIMIT_SERVICES } from '../utils/constants';
import ProjectItem from '../components/ProjectItem';
import {
  getAgencyProjectAction,
  loadMoreAgencyProjectAction,
  refreshAgencyProjectAction
} from '../redux/agencyProject/actions';
import * as routes from '../routes/routes';

class ListProject extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }
  componentDidMount() {
    getAgencyProjectAction({ author_id: 0 });
  }

  _onLoadMore = () => {
    const { agencyProject } = this.props;
    if (agencyProject.loadMore || this.onEndReachedCalledDuringMomentum) {
      return;
    }

    const len = agencyProject.data[0].length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    loadMoreAgencyProjectAction({ author_id: 0, page });
    this.onEndReachedCalledDuringMomentum = true;
  };

  _onRefresh = () => {
    if (this.props.agencyProject.refreshing) return;
    refreshAgencyProjectAction({ author_id: 0 });
  };

  _renderItem = ({ item }) => {
    return (
      <ProjectItem
        data={item}
        onPress={() => {
          // callback if there is a component invoke this component to get projectId
          if (this.props.navigation.state.params && this.props.navigation.state.params.callback) {
            this.props.navigation.state.params.callback(item);
            this.props.navigation.goBack();
          } else {
            this.props.navigation.navigate(routes.projectDetail, { data: item });
          }
        }}
      />
    );
  };

  _renderFooter = () => {
    if (this.props.agencyProject.loadMore) {
      return <ActivityIndicator style={{ alignSelf: 'center', marginVertical: 10 }} />;
    }
    return <View style={{ height: _dims.defaultPadding }} />;
  };

  _renderEmpty = () => {
    if (this.props.agencyProject.fetching) {
      return null;
    }
    return <Empty title={errorStrings.emptyListAgencyRealty} />;
  };

  render = () => {
    const { agencyProject } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title={headerStrings.agencyProject}
          onLeftPress={() => this.props.navigation.goBack()}
        />
        {agencyProject.fetching ? (
          <PlaceHolder />
        ) : (
          <FlatList
            data={this.props.agencyProject.data[0]}
            renderItem={this._renderItem}
            keyExtractor={item => `${item.id}`}
            ListHeaderComponent={() => <Separator height={_dims.defaultPadding} />}
            ListFooterComponent={this._renderFooter}
            ItemSeparatorComponent={() => <Separator height={_dims.defaultPadding} />}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            refreshing={this.props.agencyProject.refreshing}
            onEndReachedThreshold={0}
            onRefresh={this._onRefresh}
            onEndReached={this._onLoadMore}
          />
        )}
      </View>
    );
  };
}

export default connect(state => ({
  agencyProject: state.agencyProject
}))(ListProject);
