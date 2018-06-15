import React from 'react';
import {
  View,
  Picker,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';

import { responsiveHeight, _colors } from '../../../utils/constants';

export default class PickerCity extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      value: data[0]
    };
  }
  render() {
    return (
      <Modal
        transparent
        animationType="slide"
        visible={this.props.visible}
        onRequestClose={this.props.requestClose}
      >
        <TouchableWithoutFeedback onPress={this.props.closeModal}>
          <View style={styles.wrapper} >
            <View style={styles.header} >
              <TouchableOpacity
                style={{ padding: 15 }}
                onPress={() => this.props.requestClose}
              >
                <Text style={{ color: _colors.mainColor, fontWeight: 'bold' }}>Huy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 15 }}
                onPress={() => { if(this.state.value) this.props.onDone(this.state.value); }}
              >
                <Text style={{ color: this.state.value ? _colors.mainColor : 'gray', fontWeight: 'bold' }}>Chon</Text>
              </TouchableOpacity>
            </View>
            <Picker
              style={styles.picker}
              mode="dropdown"
              selectedValue={this.state.value}
              onValueChange={value => {
                if(value) this.setState({ value });
              }}
            >
              {this.props.data.map(item => (
                <Picker.Item value={item.id} label={item.name} key={item.id} />
              ))}
            </Picker>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  picker: {
    width: '100%',
    height: responsiveHeight(30),
    backgroundColor: '#c5cad4'
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ebedef'
  }
});
