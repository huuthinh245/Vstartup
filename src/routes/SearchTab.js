import React from 'react';
import { View, StatusBar, Easing } from 'react-native';
import { connect } from 'react-redux';
import FlipView from 'react-native-flip-view-next';

import { _colors } from '../utils/constants';
import Header from '../navigators/headers/SearchTab';
import SearchFront from '../components/tabs/SearchFront';
import SearchBack from '../components/tabs/SearchBack';
import { getListRealtyAction } from '../redux/listRealty/actions';

class SearchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
  }

  componentDidMount() {
    getListRealtyAction({ page: 1 });
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
