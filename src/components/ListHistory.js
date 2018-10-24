import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import emitter from '../emitter';

import Overlay from '../components/common/Overlay';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import errorStrings from '../localization/error';
import alertStrings from '../localization/alert';
import { Separator, Empty, PlaceHolder } from '../components/flatlistHelpers';
import { _dims, LIMIT_SERVICES, _colors } from '../utils/constants';
import { _alert } from '../utils/alert';
import HistoryItem from '../components/HistoryItem';
import {
  getListHistoryAction,
  loadMoreListHistoryAction,
  refreshListHistoryAction,
  deleteHistoryAction
} from '../redux/listHistory/actions';
import * as routes from '../routes/routes';

const indicator = {
  alignSelf: 'center',
  bottom: 10,
  position: 'absolute',
  zIndex: 100
};

const textStyle = color => ({ color: color || _colors.mainColor });

class ListHistory extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
      edit: false,
      selected: []
    };
  }
  componentDidMount() {
    getListHistoryAction();
  }

  _renderHeader = () => {
    return this.state.edit ? (
      <Header
        outer
        left={
          <TouchableOpacity onPress={() => this.setState({ edit: false })}>
            <Text style={textStyle()}>{headerStrings.cancel}</Text>
          </TouchableOpacity>
        }
        right={
          <TouchableOpacity
            onPress={() => {
              _alert(alertStrings.delete, alertStrings.confirmDelete, [
                {
                  text: alertStrings.ok,
                  onPress: () => {
                    const ids = this.state.selected
                      .map(item => item.id)
                      .toString();
                    const callback = () => {
                      this.setState({ edit: false });
                      emitter.emit('alert', {
                        type: 'success',
                        title: alertStrings.success,
                        error: alertStrings.deleteSuccess
                      });
                    };
                    deleteHistoryAction({ ids, callback });
                  }
                },
                {
                  text: alertStrings.cancel
                }
              ]);
            }}
          >
            <Text style={textStyle('red')}>
              {headerStrings.delete} ({this.state.selected.length})
            </Text>
          </TouchableOpacity>
        }
      />
    ) : (
      <Header title={headerStrings.historyTitle} outer />
    );
  };

  _renderItem = ({ item }) => {
    const copy = _.map(this.state.selected, _.clone);
    return (
      <HistoryItem
        data={item}
        selected={!_.some(this.state.selected, { id: item.id })}
        edit={this.state.edit}
        onPress={() => {
          this.props.navigation.navigate('SearchTab', { data: item });
          emitter.emit('mapFly', {
            latitude: item.coordinate.lat,
            longitude: item.coordinate.lng
          });
          emitter.emit('flip');
        }}
        onLongPress={() => this.setState({ edit: true, selected: [] })}
        onSelect={() => {
          if (!_.some(copy, { id: item.id })) {
            copy.push(item);
            this.setState({ selected: copy });
          } else {
            const newData = _.reject(copy, obj => obj.id === item.id);
            this.setState({ selected: newData });
          }
        }}
      />
    );
  };

  _onLoadMore = () => {
    if (
      this.props.listHistory.loadMore ||
      this.props.listHistory.fetching ||
      this.props.listHistory.refreshing ||
      this.onEndReachedCalledDuringMomentum
    ) {
      return;
    }

    const len = this.props.listHistory.data.length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    loadMoreListHistoryAction({ page });
    this.onEndReachedCalledDuringMomentum = true;
  };

  _onRefresh = () => {
    if (this.props.listHistory.refreshing) return;
    refreshListHistoryAction();
  };

  render = () => {
    const { listHistory } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {this._renderHeader()}
        {listHistory.fetching ? (
          <PlaceHolder />
        ) : (
          <View style={{ flex: 1 }}>
            <Overlay visible={this.props.listHistory.deleting} />
            <FlatList
              data={listHistory.data}
              extraData={this.state.selected}
              renderItem={this._renderItem}
              keyExtractor={item => `${item.id}`}
              ListHeaderComponent={() => (
                <Separator height={_dims.defaultPadding} />
              )}
              ListFooterComponent={() => (
                <View style={{ height: _dims.defaultPadding }} />
              )}
              ItemSeparatorComponent={() => (
                <Separator height={_dims.defaultPadding} />
              )}
              ListEmptyComponent={
                <Empty title={errorStrings.emptyListHistory} />
              }
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = false;
              }}
              refreshing={listHistory.refreshing}
              onEndReachedThreshold={0.1}
              onRefresh={this._onRefresh}
              onEndReached={this._onLoadMore}
            />
            {this.props.listHistory.loadMore && (
              <ActivityIndicator animating style={indicator} />
            )}
          </View>
        )}
      </View>
    );
  };
}

export default connect(state => ({
  listHistory: state.listHistory
}))(ListHistory);
