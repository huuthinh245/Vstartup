import React from 'react';
import { View, Picker, TouchableOpacity, Text, Modal } from 'react-native';
import { _dims, responsiveHeight, _colors } from '../../../utils/constants';

export default class ModalPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: this.props.selected || this.props.data[0]
    };
  }
  render() {
    const { data, onDone, requestClose } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'lightyellow' }}>
        <Modal
          transparent
          animationType="slide"
          visible={this.props.visible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end'
            }}
          >
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: _dims.defaultPadding * 2,
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderColor: 'rgba(192,192,192,0.4)'
              }}
            >
              <TouchableOpacity style={{ padding: 10 }} onPress={requestClose}>
                <Text style={{ color: _colors.mainColor }}>Huy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 10 }} onPress={() => onDone(this.state.val)}>
                <Text style={{ color: _colors.mainColor }}>Chon</Text>
              </TouchableOpacity>
            </View>
            <Picker
              style={{
                width: '100%',
                height: responsiveHeight(30),
                backgroundColor: '#fff'
              }}
              selectedValue={this.state.val}
              onValueChange={val => this.setState({ val })}
            >
              {data.map(item => <Picker.Item value={item.id} label={item.name} key={item.id} />)}
            </Picker>
          </View>
        </Modal>
      </View>
    );
  }
}
