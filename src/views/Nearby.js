import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import haversine from 'haversine';
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
      }
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

    this.getNearby();
  }

  getNearby() {

    var nearby = [];

    if (this.state.markerPosition.latitude !== 0 || this.state.markerPosition.longitude !== 0 ) {

      this.props.ticoStopList.map((obj) => {

        const start = {
          latitude: this.state.markerPosition.latitude,
          longitude: this.state.markerPosition.longitude
        };

        const end = {
          latitude: obj.coordinates.latitude,
          longitude: obj.coordinates.longitude
        };

        if (haversine(start, end, {unit: 'meter'}) <= 1500) {
          nearby.push(obj);
        }

      });

      this.props.touristDestionationList.map((obj) => {

        const start = {
          latitude: this.state.markerPosition.latitude,
          longitude: this.state.markerPosition.longitude
        };

        const end = {
          latitude: obj.coordinates.latitude,
          longitude: obj.coordinates.longitude
        };

        if (haversine(start, end, {unit: 'meter'}) <= 1.500) {
          nearby.push(obj);
        }

      });

      // this.props.touristicInterestList.map((obj) => {
      //
      //   const coords = obj.coordinates.split(',');
      //
      //   const start = {
      //     latitude: this.state.markerPosition.latitude,
      //     longitude: this.state.markerPosition.longitude
      //   };
      //
      //   const end = {
      //     latitude: coords[0],
      //     longitude: coords[1]
      //   };
      //
      //   if (haversine(start, end, {unit: 'meter'}) <= 1.500) {
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
    const tempMarkers = [
      {
        coordinate: this.state.markerPosition,
        title: 'Ubicacion actual',
        description: 'Aca estas pelotudo'
      },
      {
        coordinate: {latitude: this.state.markerPosition.latitude + 0.00641, longitude: this.state.markerPosition.longitude + 0.00641},
        title: '+',
        description: 'Abc'
      },
      {
        coordinate: {latitude: this.state.markerPosition.latitude - 0.00641, longitude: this.state.markerPosition.longitude - 0.00641},
        title: '-',
        description: 'Def'
      }
    ];

    return tempMarkers.map((marker,index) => {
      return (
        <MapView.Marker
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
          key={index}
        />
      );
    });
  }

  render() {
    return (
        <MapView
          style={styles.map}
          region={this.state.initialPosition}
        >
          {this.renderMarkers()}

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

export default connect(mapStateToProps)(Nearby);
