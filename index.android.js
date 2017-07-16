import React, { PureComponent } from 'react';
import { AppRegistry } from 'react-native';
//import ProvinceInfo from './src/views/provinceInfo';
import TouristDestination from './src/views/touristDestination';

export default class PVApp extends PureComponent {

  render() {
    return (
      //<ProvinceInfo/>,
      <TouristDestination/>
    );
  }
}

AppRegistry.registerComponent('PVApp', () => PVApp);
