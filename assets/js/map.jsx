import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: true
    }
  }
  onInfoWindowClose() {

  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }
  render() {
    let lat = this.props.location.state.lat;
    let lng = this.props.location.state.lng;
    let position = {lat, lng};
    let item = this.props.location.state.item;
    return (
      <Map google={this.props.google} zoom={14} initialCenter={position} onClick={this.onMapClicked.bind(this)}>

        <Marker onClick={this.onMarkerClick.bind(this)}
                name={item.depot.name}
        />

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose.bind(this)}
          visible={this.state.showingInfoWindow}
        >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: ("AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo")
})(MapContainer)