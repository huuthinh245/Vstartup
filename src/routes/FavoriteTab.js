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
      modalVisible: false,
      data: this.props.city.data.city,
      modal: 'city',
      city: {},
      district: {},
      ward: {}
    };
  }
  render() {
    // return (
    //   <View>
    //     <Button title="show" onPress={() => this.setState({ modalVisible: true })} />
    //     <ModalPicker
    //       visible={this.state.modalVisible}
    //       closeModal={() =>
    //         this.setState({ modalVisible: false, data: this.props.data.city, modal: 'city' })
    //       }
    //       requestClose={() =>
    //         this.setState({ modalVisible: false, data: this.props.data.city, modal: 'city' })
    //       }
    //       data={this.state.data}
    //       onDone={value => {
    //         if (this.state.modal === 'city') {
    //           const data = this.props.city.data.district.filter(item => item.city_id === value.id);
    //           this.setState({ data, city: value, modal: 'district' });
    //         } else if (this.state.modal === 'district') {
    //           const data = this.props.city.data.ward.filter(item => item.district_id === value.id);
    //           this.setState({ data, district: value, modal: 'ward' });
    //         } else if (this.state.modal === 'ward') {
    //           this.setState({
    //             data: this.props.data.city,
    //             ward: value,
    //             modal: 'city',
    //             modalVisible: false
    //           });
    //         }
    //       }}
    //     />
    //   </View>
    // );
    return this.props.auth.token ? (
      <ListFavorite navigation={this.props.navigation} />
    ) : (
      <Login navigation={this.props.navigation} />
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  city: state.city
}))(FavoriteTab);
