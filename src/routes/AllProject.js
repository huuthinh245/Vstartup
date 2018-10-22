import React from 'react';
import { FlatList, ActivityIndicator, View, PixelRatio } from 'react-native';
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

const indicator = {
  alignSelf: 'center',
  bottom: 10,
  position: 'absolute',
  zIndex: 100
};
const separator = {
  height: 1 / PixelRatio.get(),
  backgroundColor: '#44cee2',
  marginVertical: _dims.defaultPadding,
  marginLeft: _dims.screenWidth / 4 + _dims.defaultPadding / 2
};

class ListProject extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }
  componentDidMount() {
    getAgencyProjectAction();
  }

  _onLoadMore = () => {
    const { agencyProject } = this.props;
    if (agencyProject.loadMore || this.onEndReachedCalledDuringMomentum) {
      return;
    }

    const len = agencyProject.data[0].length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    loadMoreAgencyProjectAction({ page });
    this.onEndReachedCalledDuringMomentum = true;
  };

  _onRefresh = () => {
    if (this.props.agencyProject.refreshing) return;
    refreshAgencyProjectAction();
  };

  _renderItem = ({ item }) => {
    return (
      <ProjectItem
        item={item}
        onPress={() => {
          // callback if there is a component invoke this component to get projectId
          if (
            this.props.navigation.state.params &&
            this.props.navigation.state.params.callback
          ) {
            this.props.navigation.state.params.callback(item);
            this.props.navigation.goBack();
          } else {
            this.props.navigation.navigate(routes.projectDetail, {
              data: item
            });
          }
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
          <View style={{ flex: 1 }}>
            <FlatList
              data={this.props.agencyProject.data[0]}
              renderItem={this._renderItem}
              keyExtractor={item => `${item.id}`}
              ListHeaderComponent={() => (
                <Separator height={_dims.defaultPadding} />
              )}
              ListFooterComponent={() => (
                <View style={{ height: _dims.defaultPadding }} />
              )}
              ItemSeparatorComponent={() => <View style={separator} />}
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = false;
              }}
              refreshing={this.props.agencyProject.refreshing}
              onEndReachedThreshold={0.1}
              onRefresh={this._onRefresh}
              onEndReached={this._onLoadMore}
            />
            {this.props.agencyProject.loadMore && (
              <ActivityIndicator style={indicator} animating />
            )}
          </View>
        )}
      </View>
    );
  };
}

export default connect(state => ({
  agencyProject: state.agencyProject
}))(ListProject);
