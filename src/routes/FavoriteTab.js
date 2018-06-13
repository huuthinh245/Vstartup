import React from 'react';
import { View, Button } from 'react-native';

import { connect } from 'react-redux';

import Login from '../components/authorization/login';
import ListFavorite from '../components/ListFavorite';
import ModalPicker from '../components/common/picker';

class FavoriteTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCity: false,
      modalDistrict: false,
      modalWard: false,
      valueCity: {},
      valueDistrict: {},
      valueWard: {},
      dataDistrict: [],
      dataWard: []
    };
  }
  render() {
    return (
      <View>
        <Button title="show" onPress={() => this.setState({ modalCity: true })} />
        <ModalPicker
          selected={this.state.valueCity}
          visible={this.state.modalCity}
          data={this.props.city.data.city}
          onDone={valueCity => {
            const dataDistrict = this.props.city.data.district.filter(
              item => item.city_id === valueCity.id
            );
            console.log(valueCity, dataDistrict);
            this.setState({ valueCity, dataDistrict, modalCity: false, modalDistrict: true });
          }}
          requestClose={() => this.setState({ modalCity: false })}
        />

        <ModalPicker
          selected={this.state.valueDistrict}
          visible={this.state.modalDistrict}
          data={this.state.dataDistrict}
          onDone={valueDistrict => {
            const dataWard = this.props.city.data.ward.filter(
              item => item.district_id === valueDistrict.id
            );
            this.setState({ valueDistrict, dataWard, modalDistrict: false, modalWard: true });
          }}
          requestClose={() => this.setState({ modalCity: false })}
        />

        <ModalPicker
          selected={this.state.valueWard}
          visible={this.state.modalWard}
          data={this.state.dataWard}
          onDone={valueWard => {
            this.setState({ valueWard, modalWard: false });
          }}
          requestClose={() => this.setState({ modalCity: false })}
        />
      </View>
    );
    // return this.props.auth.token ? (
    //   <ListFavorite navigation={this.props.navigation} />
    // ) : (
    //   <Login navigation={this.props.navigation} />
    // );
  }
}

export default connect(state => ({
  auth: state.auth,
  city: state.city
}))(FavoriteTab);
