import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import Overlay from '../components/common/Overlay';
import { Separator, Empty, PlaceHolder } from '../components/flatlistHelpers';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import errorStrings from '../localization/error';
import alertStrings from '../localization/alert';
import {
  _dims,
  _colors,
  LIMIT_SERVICES,
  responsiveFontSize,
  _ios
} from '../utils/constants';
import emitter from '../emitter';
import * as routes from '../routes/routes';
import HistoryItem from '../components/HistoryItem';
import {
  getListContactAction,
  refreshListContactAction,
  deleteContactAction,
  loadMoreListContactAction
} from '../redux/contact/actions';
import { _alert } from '../utils/alert';

const textStyle = color => ({ color: color || _colors.mainColor });

const indicator = {
  alignSelf: 'center',
  bottom: 10,
  position: 'absolute',
  zIndex: 100
};

class ListContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      selected: []
    };
    this.onEndReachedCalledDuringMomentum = true;
  }
  componentDidMount() {
    console.log(this.props);
    getListContactAction();
  }

  _onRefresh = () => {
    if (this.props.listContact.refreshing) return;
    refreshListContactAction();
  };

  _renderItem = ({ item }) => {
    return (
      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Dự án: <Text style={styles.bold}>Chung cư Bella - Hà Đông</Text>
          </Text>
          <Text style={styles.line}>
            Tên người liên hệ: <Text style={styles.bold}>{item.name}</Text>
          </Text>
          <Text style={styles.line}>
            Email: <Text style={styles.bold}>{item.email}</Text>
          </Text>
          <Text style={styles.line}>
            Phone: <Text style={styles.bold}>{item.phone}</Text>
          </Text>
          {item.subject && (
            <Text style={styles.line}>
              Tiêu đề: <Text style={styles.bold}>{item.subject}</Text>
            </Text>
          )}
          {item.subject && (
            <Text style={styles.line}>
              Nội dung: <Text style={styles.bold}>{item.message}</Text>
            </Text>
          )}
        </View>
      </View>
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

  _onLoadMore = () => {
    if (
      this.props.listContact.loadMore ||
      this.onEndReachedCalledDuringMomentum
    ) {
      return;
    }
    const len = this.props.listContact.data.length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    loadMoreListContactAction({ page });
    this.onEndReachedCalledDuringMomentum = true;
  };

  render = () => {
    const { listContact } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Overlay visible={this.props.listContact.deleting} />
        {this._renderHeader()}
        {listContact.fetching ? (
          <PlaceHolder />
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              contentContainerStyle={{ paddingVertical: 10 }}
              data={listContact.data}
              renderItem={this._renderItem}
              keyExtractor={item => `${item.id}`}
              ListEmptyComponent={() => (
                <Empty title={errorStrings.emptyListContact} />
              )}
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = false;
              }}
              refreshing={listContact.refreshing}
              onRefresh={this._onRefresh}
              onEndReachedThreshold={0.1}
              onEndReached={this._onLoadMore}
            />
            {listContact.loadMore && (
              <ActivityIndicator animating style={indicator} />
            )}
          </View>
        )}
      </View>
    );
  };
}

export default connect(state => ({
  listContact: state.listContact
}))(ListContact);

const styles = StyleSheet.create({
  main: {
    borderRadius: 7,
    elevation: 3,
    shadowColor: '#888',
    shadowOpacity: 0.4,
    shadowRadius: 7,
    overflow: !_ios ? 'hidden' : 'visible'
  },
  content: {
    flex: 1,
    borderRadius: 7,
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5
  },
  title: {
    fontSize: responsiveFontSize(_dims.defaultFontInput),
    color: '#333'
  },
  bold: {
    fontWeight: 'bold',
    color: '#000'
  },
  line: {
    color: '#333',
    marginTop: 5
  }
});
