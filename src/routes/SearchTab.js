import React from 'react';
import { View, StatusBar, Easing } from 'react-native';
import { connect } from 'react-redux';
import FlipView from 'react-native-flip-view-next';

import { json, _colors } from '../utils/constants';
import Header from '../navigators/headers/SearchTab';
import SearchFront from '../components/tabs/SearchFront';
import SearchBack from '../components/tabs/SearchBack';
import { realtyApi } from '../utils/api';
import alertStrings from '../localization/alert';
import { _alert } from '../utils/alert';

import { GET_LIST_REALTY, GET_LIST_REALTY_SUCCESS } from '../redux/listRealty/reducer';

class SearchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
  }

  componentDidMount() {
    const callback = (error, data, response) => {
      if (error) {
        console.log(error);
        // _alert(alertStrings.error, response.body.message);
      } else {
        this.props.dispatch({
          type: GET_LIST_REALTY_SUCCESS,
          payload: data
        });
      }
    };
    this.props.dispatch({ type: GET_LIST_REALTY });
    realtyApi.listRealty({ page: 1 }, callback);
  }

  _flip = () => {
    this.setState({ isFlipped: !this.state.isFlipped });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: _colors.viewBG }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header
          flipIcon={!this.state.isFlipped ? 'md-list' : 'md-pin'}
          onFlipPress={this._flip}
          onFilterPress={() => this.setState({ editing: !this.state.editing })}
          editText={!this.state.editing ? 'Edit' : 'Done'}
        />
        <FlipView
          style={{ flex: 1 }}
          front={<SearchFront {...this.props} />}
          back={<SearchBack {...this.props} />}
          isFlipped={this.state.isFlipped}
          flipAxis="y"
          flipEasing={Easing.out(Easing.ease)}
          flipDuration={500}
          perspective={1000}
        />
      </View>
    );
  }
}

export default connect()(SearchTab);
