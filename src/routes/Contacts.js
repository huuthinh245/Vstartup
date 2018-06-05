import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import Overlay from '../components/common/Overlay';
import { Separator, Empty } from '../components/flatlistHelpers';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import errorStrings from '../localization/error';
import alertStrings from '../localization/alert';
import { _dims, _colors } from '../utils/constants';
import emitter from '../emitter';
import { PlaceHolder } from '../components/RealtyItem';
import * as routes from '../routes/routes';
import HistoryItem from '../components/HistoryItem';
import {
  getListContactAction,
  refreshListContactAction,
  deleteContactAction
} from '../redux/contact/actions';
import { _alert } from '../utils/alert';

const textStyle = color => ({ color: color || _colors.mainColor });

class ListContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      selected: []
    };
  }
  componentDidMount() {
    getListContactAction();
  }

  _onRefresh = () => {
    if (this.props.listContact.refreshing) return;
    refreshListContactAction();
  };

  _renderItem = ({ item }) => {
    const copy = _.map(this.state.selected, _.clone);
    return (
      <HistoryItem
        data={item}
        selected={!_.some(this.state.selected, { id: item.id })}
        edit={this.state.edit}
        onPress={() => this.props.navigation.navigate(routes.realtyDetail, { data: item })}
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
                    const ids = this.state.selected.map(item => item.id).toString();
                    const callback = () => {
                      this.setState({ edit: false });
                      emitter.emit('alert', {
                        type: 'success',
                        title: alertStrings.success,
                        error: alertStrings.deleteSuccess
                      });
                    };
                    deleteContactAction({ ids, callback });
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
      <Header
        title={headerStrings.listContact}
        onLeftPress={() => this.props.navigation.goBack()}
      />
    );
  };

  render = () => {
    const { listContact } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Overlay visible={this.props.listContact.deleting} />
        {this._renderHeader()}
        {listContact.fetching ? (
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
            data={listContact.data}
            renderItem={this._renderItem}
            keyExtractor={item => `${item.id}`}
            ListHeaderComponent={() => <Separator height={_dims.defaultPadding} />}
            ItemSeparatorComponent={() => <Separator height={_dims.defaultPadding} />}
            ListEmptyComponent={() => <Empty title={errorStrings.emptyListContact} />}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            refreshing={listContact.refreshing}
            onRefresh={this._onRefresh}
          />
        )}
      </View>
    );
  };
}

export default connect(state => ({
  listContact: state.listContact
}))(ListContact);
