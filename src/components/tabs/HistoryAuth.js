import React from 'react';
import { View, FlatList, Text } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';

import Separator from '../flatlistHelpers/Separator';
import HistoryItem from '../HistoryItem';
import { _dims } from '../../utils/constants';
import * as routes from '../../navigators/defineRoutes';
import Header from '../../navigators/headers/CommonHeader';
import headerStrings from '../../localization/header';
import Spin from '../common/Spinner';
import { getListKeywordAction } from '../../redux/listKeyword/actions';

class HistoryAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      selected: []
    };
  }

  componentDidMount() {
    getListKeywordAction();
  }

  _renderItem = ({ item }) => {
    const copy = _.map(this.state.selected, _.clone);
    return (
      <HistoryItem
        edit={this.state.edit}
        selected={!_.some(this.state.selected, { id: item.id })}
        data={item}
        {...this.props}
        onPress={() => this.props.navigation.navigate(routes.realtyDetail, { data: item })}
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

  render() {
    const { listKeyword } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          outer
          title={headerStrings.historyTitle}
          right={this.state.edit ? 'Delete' : 'Edit'}
          onRightPress={() => {
            if (this.state.edit) {
              this.setState({ edit: false });
            } else {
              this.setState({ edit: true });
            }
          }}
        />
        {listKeyword.fetching ? (
          <Spin />
        ) : (
          <FlatList
            style={{ flex: 1, marginHorizontal: _dims.defaultPadding }}
            data={listKeyword.data}
            renderItem={this._renderItem}
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={() => <Separator height={_dims.defaultPadding} />}
            ListHeaderComponent={() => <Separator height={_dims.defaultPadding} />}
            ListFooterComponent={() => <Separator height={_dims.defaultPadding} />}
            ListEmptyComponent={() => <Text>empty</Text>}
          />
        )}
      </View>
    );
  }
}

export default connect(state => ({ listKeyword: state.listKeyword }))(HistoryAuth);
