import React, { Component } from 'react';
import {GoogleMap, Marker, withGoogleMap, DirectionsRenderer} from 'react-google-maps';


const Map = withGoogleMap((props) => {
  return <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {<Marker position={{ lat: props.lat, lng: props.lng }} />}
    {props.directions && <DirectionsRenderer directions={props.directions} />}

  </GoogleMap>
});

export default class MapContainer extends Component {
  constructor() {
    super();
    this.state = {directions: null}
  }
  componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService();
    let item = this.props.location.state.item;
    let currLat = 37.900000;
    let currLng = -122.300000;
    let destLat = this.props.location.state.lat;
    let destLng = this.props.location.state.lng;
    DirectionsService.route({
      origin: new google.maps.LatLng(currLat, currLng),
      destination: new google.maps.LatLng(destLat, destLng),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }
  render() {
    return <Map
      isMarkerShown={true}
      onMarkerClick={this.handleMarkerClick}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      directions={this.state.directions}
      lat={parseFloat(this.props.location.state.lat)}
      lng={parseFloat(this.props.location.state.lng)}
    />
  }
}
// export class MapContainer extends Component {
//   constructor(props) {
//     super();
//   }
//   render() {
//     let lat = this.props.location.state.lat;
//     let lng = this.props.location.state.lng;
//     let position = {lat, lng};
//     let item = this.props.location.state.item;
//     return (<div>
//       <GoogleMap
//         defaultZoom={8}
//         defaultCenter={{ lat: -34.397, lng: 150.644 }}
//       >
//       </GoogleMap>
//     </div>);
//   }
// }


// export default GoogleApiWrapper({
//   apiKey: ("AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo")
// })(MapContainer)