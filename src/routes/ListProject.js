import React from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import Separator from '../components/flatlistHelpers/Separator';
import { _dims, LIMIT_SERVICES } from '../utils/constants';
import { PlaceHolder } from '../components/RealtyItem';
import ProjectItem from '../components/ProjectItem';
import {
  getListProjectAction,
  loadMoreListProjectAction,
  refreshListProjectAction
} from '../redux/listProject/actions';
import * as routes from '../routes/routes';

class ListProject extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }
  componentDidMount() {
    getListProjectAction();
  }

  _onLoadMore = () => {
    if (
      this.props.listProject.loadMore ||
      this.props.listProject.fetching ||
      this.props.listProject.refreshing ||
      this.onEndReachedCalledDuringMomentum
    ) {
      return;
    }

    const len = this.props.listProject.data.length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    loadMoreListProjectAction({ page });
    this.onEndReachedCalledDuringMomentum = true;
  };

  _onRefresh = () => {
    if (this.props.listProject.refreshing) return;
    refreshListProjectAction();
  };

  _renderItem = ({ item }) => {
    return (
      <ProjectItem
        data={item}
        onPress={() => {
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
    if (this.props.listProject.loadMore) {
      return (
        <ActivityIndicator
          style={{
            alignSelf: 'center',
            marginVertical: 10
          }}
        />
      );
    }
    return null;
  };

  render = () => {
    const { listProject } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={headerStrings.listProject}
          onLeftPress={() => this.props.navigation.goBack()}
        />
        {listProject.fetching ? (
          <View>
            <PlaceHolder />
            <Separator height={_dims.defaultPadding} />
            <PlaceHolder />
            <Separator height={_dims.defaultPadding} />
            <PlaceHolder />
            <Separator height={_dims.defaultPadding} />
            <PlaceHolder />
            <Separator height={_dims.defaultPadding} />
            <PlaceHolder />
          </View>
        ) : (
          <FlatList
            style={{ flex: 1, marginHorizontal: _dims.defaultPadding }}
            data={this.props.listProject.data}
            renderItem={this._renderItem}
            keyExtractor={item => `${item.id}`}
            ListHeaderComponent={() => <Separator height={_dims.defaultPadding} />}
            ListFooterComponent={this._renderFooter}
            ItemSeparatorComponent={() => <Separator height={_dims.defaultPadding} />}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            refreshing={this.props.listProject.refreshing}
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
  listProject: state.listProject
}))(ListProject);
