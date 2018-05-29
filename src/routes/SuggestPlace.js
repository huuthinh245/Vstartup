import React from 'react';
import { TouchableOpacity } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import strings from '../localization/location';
import { styles as headerStyles } from '../navigators/headers/styles';

export default class GooglePlacesInput extends React.Component {
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder={strings.placeholder}
        minLength={2}
        autoFocus
        returnKeyType="search"
        listViewDisplayed="auto"
        fetchDetails
        renderDescription={row => row.description}
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        getDefaultValue={() => ''}
        query={{
          key: 'AIzaSyC91wuedAepcP_LjIHxwhlqGOFmtxDqBME',
          language: 'vn',
          types: 'address'
        }}
        styles={{
          textInputContainer: headerStyles.suggestHeader,
          textInput: headerStyles.searchBarInput,
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: 'rgb(0,122,255)'
          }
        }}
        currentLocation
        currentLocationLabel={strings.current}
        nearbyPlacesAPI="GooglePlacesSearch"
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          types: 'address'
        }}
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
        debounce={200}
        renderLeftButton={() => (
          <TouchableOpacity
            style={headerStyles.left}
            onPress={() => this.props.navigation.goBack()}
          >
            <IonIcons name="md-arrow-back" style={headerStyles.icon} />
          </TouchableOpacity>
        )}
      />
    );
  }
}
