import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { _colors } from '../utils/constants';
import Header from '../navigators/headers/SearchTab';
import { getListRealtyAction } from '../redux/listRealty/actions';
import * as routes from './routes';
import Map from '../components/map';

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
    const { listRealty } = this.props;

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
        {isEmpty(listRealty.data) ? null : <Map listRealtyData={listRealty.data} />}
      </View>
    );
  }
}

export default connect(state => ({ listRealty: state.listRealty }))(SearchTab);
