import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import haversine from 'haversine';
import {getDirections} from '../actions';
import person from '../resources/images/person.png';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Nearby extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      markersToRender: []
    };
  }

  watchID: ?number = null;

  componentWillMount() {

    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var lon = parseFloat(position.coords.longitude);

      var initialRegion = {
        latitude: lat,
        longitude: lon,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };

      this.setState({initialPosition: initialRegion});
      this.setState({markerPosition: initialRegion});
      this.renderMarkers();
    },
    (error) => console.log(JSON.stringify(error)),
    {enableHighAccuaracy: true, timeout: 20000, maximumAge: 1000});

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var lon = parseFloat(position.coords.longitude);

      var lastRegion = {
        latitude: lat,
        longitude: lon,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };

      this.setState({initialPosition: lastRegion});
      this.setState({markerPosition: lastRegion});

    });



  }

  getNearby() {

    var nearby = [];

    if (this.state.markerPosition.latitude !== 0 || this.state.markerPosition.longitude !== 0 ) {

      const start = {
        latitude: this.state.markerPosition.latitude,
        longitude: this.state.markerPosition.longitude
      };

      this.props.ticoStopList.map((obj) => {

        const end = {
          latitude: obj.coordinates.latitude,
          longitude: obj.coordinates.longitude
        };

        if (haversine(start, end, {unit: 'meter'}) <= 2000) {
          obj.type = 'Tico Stop';
          nearby.push(obj);
        }

      });

      this.props.touristDestionationList.map((obj) => {

        const end = {
          latitude: obj.coordinates.latitude,
          longitude: obj.coordinates.longitude
        };

        if (haversine(start, end, {unit: 'meter'}) <= 2000) {
          obj.type = 'Destination';
          nearby.push(obj);
        }

      });

      // this.props.touristicInterestList.map((obj) => {
      //
      //   const end = {
      //     latitude: obj.coordinates.latitude,
      //     longitude: obj.coordinates.longitude
      //   };
      //
      //   if (haversine(start, end, {unit: 'meter'}) <= 1500) {
      //     obj.type = 'Service';
      //     nearby.push(obj);
      //   }
      //
      // });
    }
    return nearby;
  }


  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  renderMarkers() {

    if (this.state.markerPosition.latitude !== 0 || this.state.markerPosition.longitude !== 0 ) {

      const nearbyMarkers = this.getNearby();
      console.log(nearbyMarkers);

      nearbyMarkers.map((marker) => {

        getDirections(this.state.markerPosition.latitude + ',' + this.state.markerPosition.longitude, marker.coordinates.latitude + ',' + marker.coordinates.longitude).then(async(response) => {

          marker.distance = response.routes[0].legs[0].distance.text;

          this.setState({ markersToRender: [...this.state.markersToRender,
            {
              coordinate: {
                latitude: marker.coordinates.latitude,
                longitude: marker.coordinates.longitude
              },
              title: marker.name,
              description: 'Distancia ' + marker.distance,
              pinColor: ( marker.type === 'Tico Stop' ? '#9e2424' : marker.type === 'Destination' ? '#1d7d01' : '#2242b3' )
            },
          ],
          });
        });
      });



      // return this.state.markersToRender.map((obj,index) => {
      //   return (
      //     <MapView.Marker
      //       coordinate={obj.coordinate}
      //       title={obj.title}
      //       description={obj.description}
      //       pinColor={obj.pinColor}
      //       key={index}
      //     />
      //   );
      // });
    }
  }

  render() {
    return (
        <MapView
          style={styles.map}
          region={this.state.initialPosition}
        >
          <MapView.Marker
            coordinate={this.state.markerPosition}
            image={person}
          />
          {this.state.markersToRender.map((marker, index) => {
            return (
              <MapView.Marker
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                pinColor={marker.pinColor}
                key={index}
              />
            );
          })}
        </MapView>
    );
  }

}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});

const mapStateToProps = state => {
  return {
    ticoStopList: state.db.staticData.ticoStops,
    touristDestionationList: state.db.staticData.touristDestinations,
    touristicInterestList: state.db.staticData.touristicInterests
  };
};

export default connect(mapStateToProps,{getDirections})(Nearby);
