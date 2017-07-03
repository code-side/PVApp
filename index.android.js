import React, { PureComponent } from 'react';
import { AppRegistry, Image, Text, View } from 'react-native';
import { Container, Content } from 'native-base'
import LoginAndroid from './views/login/LoginView'
export default class PVApp extends PureComponent {

  render() {
    return (
    <Container>

      <LoginAndroid/>
    
    </Container>

    );
  }
}

const styles = {
  imageStyle: {
  height: 100,
  width: 100,
},
   container: {
     flex: 1
   }
};

AppRegistry.registerComponent('PVApp', () => PVApp);
