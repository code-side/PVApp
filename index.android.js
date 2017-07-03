import React, { PureComponent } from 'react';
import { AppRegistry } from 'react-native';
import ProvinceInfo from './src/views/provinceInfo';

export default class PVApp extends PureComponent {

  render() {
    return (
      <ProvinceInfo/>
    );
  }
}

AppRegistry.registerComponent('PVApp', () => PVApp);
