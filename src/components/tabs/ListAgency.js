import React, {
  Component
} from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import {
  connect
} from 'react-redux';
import AgencyDetail from '../../components/AgencyDetail';
  
const arr = [
  {
    id: 1,
    name: 'ttt',
    phone: '0123418421',
    rating: 4,
    avatar: 'https://images.pexels.com/photos/658687/pexels-photo-658687.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    id: 2,
    rating: 5,
    name: 'ttta',
    phone: '0123418421',
    avatar: 'https://images.pexels.com/photos/658687/pexels-photo-658687.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    id: 3,
    name: 'tttaaa',
    phone: '0123418421',
    rating: 2,
    avatar: 'https://images.pexels.com/photos/658687/pexels-photo-658687.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    id: 4,
    name: 'ttt444',
    phone: '0123418421',
    rating: 1,
    avatar: 'https://images.pexels.com/photos/658687/pexels-photo-658687.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    id: 5,
    name: 'ttt776',
    phone: '0123418421',
    rating: 3,
    avatar: 'https://images.pexels.com/photos/658687/pexels-photo-658687.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    id: 6,
    name: 'ttt776444',
    phone: '0123418421',
    rating: 0,
    avatar: 'https://images.pexels.com/photos/658687/pexels-photo-658687.jpeg?auto=compress&cs=tinysrgb&h=350'
  }
];
  
class ListAgency extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={arr}
          renderItem={({ item }) => <AgencyDetail item={item} />}
          numColumns={2}
        />
      </View>
    );
  }
}
  
export default connect()(ListAgency);