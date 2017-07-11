import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
//import TicoStop from './src/views/ticoStop';
import TouristicInterest from './src/views/touristicInterest';

export default class PVApp extends Component {
  render() {
    return (
       // <TicoStop />
      <TouristicInterest />
    );
  }
}


AppRegistry.registerComponent('PVApp', () => PVApp);
