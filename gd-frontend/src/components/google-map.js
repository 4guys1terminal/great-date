import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const KEY = "AIzaSyDhtvMPgk9g80v-1kIR2FN9_8Yq8MNVpbk"
const STYLE = {
  width: 300,
  height: 300,
  position: 'relative'
}

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
       showingInfoWindow: false,
       activeMarker: {},
       selectedPlace: {},
     }
     this.onMarkerClick = this.onMarkerClick.bind(this);
     this.onMapClicked = this.onMapClicked.bind(this);
   }

  onMarkerClick(props, marker, e) {
    // console.log('props:', props)
    // console.log('marker:', marker)
    // console.log('e:', e)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    console.log(props);
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    return(
      <Map google={this.props.google} onClick={this.onMapClicked} zoom={14} style={STYLE}>
        <Marker onClick={this.onMarkerClick}
          name={'Current location'} />


        <InfoWindow
          onOpen={this.windowHasOpened}
          onClose={this.windowHasClosed}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (`${KEY}`)
})(MapContainer)
