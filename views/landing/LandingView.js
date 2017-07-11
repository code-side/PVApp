import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Linking,
} from 'react-native';
import { StackNavigator,NavigationActions } from 'react-navigation';
import { Container, Content,Button } from 'native-base';


class LandingScreen extends React.Component {

  static navigationOptions = {
      header: null
  }

  invoke(type, resource) {
    if (Linking.canOpenURL(type + ':' + resource)) {
      Linking.openURL(type + ':' + resource);

    }
  }

  render() {

    return (
      <View>
        <Text>Landing page screen</Text>
        <Button onPress={() => this.invoke('geo', '9.6328645,-82.6582748')}><Text>Click me</Text></Button>
      </View>
    );
  }
}
export default LandingScreen;
