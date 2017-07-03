import React, { PureComponent } from 'react';
import { AppRegistry, View } from 'react-native';
//import Card from './src/components/Card';
//import CardSection from './src/components/CardSection';
import TouristDestination from './src/views/TouristDestination';

export default class PVApp extends PureComponent {
render() {
    return (
      <View>
          <TouristDestination/>
      </View>
 );
 }
 }
AppRegistry.registerComponent('PVApp', () => PVApp);
