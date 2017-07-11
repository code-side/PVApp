import React from 'react';
import {
  AppRegistry,
  Text,Button
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Container, Content } from 'native-base';
import LoginAndroid from './views/login/loginView';
import LandingScreen from './views/landing/landingView';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'PVApp',
    header: null
  };

  goToHomeScreen =() =>{
    this.props.navigation.navigate('LandingScreen');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (

      <Container>
      <LoginAndroid goToHomeScreen={this.goToHomeScreen}/>
      </Container>
    )
  }
}

const PVApp = StackNavigator({
  Home: { screen: HomeScreen },
  LandingScreen: { screen: LandingScreen },
});

AppRegistry.registerComponent('PVApp', () => PVApp);
