import React from 'react';
import { View, Easing } from 'react-native';
import { connect } from 'react-redux';
import FlipView from 'react-native-flip-view-next';

import { _colors } from '../utils/constants';
import Header from '../navigators/headers/SearchTab';
import SearchFront from '../components/tabs/SearchFront';
import SearchBack from '../components/tabs/SearchBack';
import { getListRealtyAction } from '../redux/listRealty/actions';
import * as routes from './routes';

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
        <Header
          flipIcon={!this.state.isFlipped ? 'md-list' : 'md-pin'}
          onFlipPress={this._flip}
          onTitlePress={() => {
            RNGooglePlacePicker.show(response => {
              if (response.didCancel) {
                console.log('User cancelled GooglePlacePicker');
              } else if (response.error) {
                console.log('GooglePlacePicker Error: ', response.error);
              } else {
                console.log(response);
              }
            });
          }}
          onFilterPress={() =>
            this.props.navigation.navigate(routes.filterScreen, {
              onDone: value => alert(value.toString())
            })
          }
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
