import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  connect
} from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { _colors, width, responsiveFontSize, _dims } from '../../utils/constants';
import Dropdown from '../common/Dropdown';
import ExtendsionItem from '../common/ExtendsionItem';

const styleSh = StyleSheet.create({
  track: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#3acce1',
    backgroundColor: '#fff',
  },
  tilte: {
    fontSize: responsiveFontSize(_dims.defaultFontSize),
    color: _colors.mainColor,
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 5
  },
  picker: {
    flexDirection: 'row',
  },
  dropdown_1: {
    justifyContent: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: _colors.mainColor,
    marginHorizontal: 20
  },
  dropdown_2_dropdown: {
    flex: 1,
    width: width / 2 - 40,
  },
});

const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4'];

class FilterProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiSliderPrice: [0, 1000],
      multiSliderArea: [0, 100],
      bathroom: DEMO_OPTIONS_1[0],
      bedroom: DEMO_OPTIONS_1[0],
      checkSchool: false,
      checkMarket: false,
      checkPark: false,
      checkPet: false
    };
  }

  _canada(province) {
    this.setState({
      ...this.state,
      canada: province
    });
  }

      multiSliderPriceFinish = (values) => {
        this.setState({
          multiSliderPrice: values
        });
      }
      multiSliderAreaFinish = (values) => {
        this.setState({
          multiSliderArea: values
        });
      }
      renderMarker = (e) => {
        return (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14 }}>
              {e.currentValue}
            </Text>
            <View style={styleSh.track} />
          </View>
        ); 
      }
      render() {
        return (
          <View style={{ flex: 1, backgroundColor: '#fff' }} >
            <Text style={styleSh.tilte}>Gia</Text>
            <MultiSlider
              containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
              values={this.state.multiSliderPrice}
              onValuesChange={this.multiSliderValuesChange}
              onValuesChangeFinish={values => this.multiSliderPriceFinish(values)}
              sliderLength={width - 60}
              min={0}
              max={100}
              step={10}
              isMarkersSeparated
              customMarkerLeft={this.renderMarker}
              customMarkerRight={this.renderMarker}
            />
            <Text style={styleSh.tilte}>Dien tich</Text>
            <MultiSlider
              containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
              values={this.state.multiSliderArea}
              onValuesChangeFinish={values => this.multiSliderAreaFinish(values)}
              sliderLength={width - 60}
              min={0}
              max={100}
              step={10}
              isMarkersSeparated
              customMarkerLeft={this.renderMarker}
              customMarkerRight={this.renderMarker}
            />
            <View style={styleSh.picker}>
              <View style={{ flex: 1 }}>
                <Text style={styleSh.tilte}>Phong ngu</Text>
                <Dropdown 
                  defaultValue={this.state.bathroom}
                  data={DEMO_OPTIONS_1}
                  onSelect={(index) => console.log(index)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styleSh.tilte}>Phong tam</Text>
                <Dropdown 
                  defaultValue={this.state.bathroom}
                  data={DEMO_OPTIONS_1}
                  onSelect={(index) => console.log(index)}
                />
              </View>
            </View>
            <Text style={styleSh.tilte}>tien ich</Text>
            <ExtendsionItem
              style={{ marginHorizontal: 20 }}
              onPress={() => this.setState({ checkSchool: !this.state.checkSchool })}
              title="Gần trường học"
              checked={this.state.checkSchool}   
            />
            <ExtendsionItem
              style={{ marginHorizontal: 20 }}
              onPress={() => this.setState({ checkMarket: !this.state.checkMarket })}
              title="Gần chợ"
              checked={this.state.checkMarket}   
            />
            <ExtendsionItem
              style={{ marginHorizontal: 20 }}
              onPress={() => this.setState({ checkPark: !this.state.checkPark })}
              title="Bãi giữ xe"
              checked={this.state.checkPark}   
            />
            <ExtendsionItem
              style={{ marginHorizontal: 20 }}
              onPress={() => this.setState({ checkPet: !this.state.checkPet })}
              title="Được nuôi thú cưng"
              checked={this.state.checkPet}   
            />
            <View style={[styleSh.picker, { marginVertical: 15 }, { alignItems: 'center' }]}>
              <Text style={{ flex: 1, marginLeft: 20 }}>Phong tam</Text>
              <Dropdown 
                style={{ flex: 1 }}
                defaultValue={this.state.bathroom}
                data={DEMO_OPTIONS_1}
                onSelect={(index) => console.log(index)}
              />
            </View>
            <TouchableOpacity style={{ position: 'absolute', backgroundColor: _colors.mainColor, right: 0, left: 0, bottom: 0, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}>
              <Text style={{ marginVertical: 20, flex: 1, fontSize: responsiveFontSize(_dims.defaultFontSize), color: '#fff', textAlign: 'left' }}>Xem ket qua</Text>
              <Text style={{ marginVertical: 20, flex: 1, fontSize: responsiveFontSize(_dims.defaultFontSize), color: '#fff', textAlign: 'right' }}>Chon lai</Text>
            </TouchableOpacity>
          </View>
        );
      }
}
  
export default connect()(FilterProject);
  