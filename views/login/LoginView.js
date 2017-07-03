import React, { Component } from 'react';
import { Button,Body,Content } from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Navigator,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';


class LoginAndroid extends Component {
 constructor(props) {
    super(props);
    this.state = {
      userName: '',
      pass: ''
    };
  }

  _handlePress = () =>{

  }

  render() {

    return (

     <Content>
     <View style={styles.loginContainer}>
        <Text style={styles.welcome}>PVApp</Text>
        <View style ={styles.body}>
         <TextInput
          onChangeText={(userName) => this.setState({userName})}
          placeholder = 'Correo'
          value={this.state.userName}
        />
        <TextInput
          onChangeText={(pass) => this.setState({pass})}
          secureTextEntry={true}
          placeholder = 'Contraseña'
          value={this.state.pass}
        />
        <TouchableHighlight>
          <Text> Olvido su contraseña?</Text>
        </TouchableHighlight>
        <Button primary style={{marginLeft:80,marginTop:15}}
        onPress={() => this._handlePress()}>
          <Text style={styles.loginButton}> Login </Text>
        </Button>


        </View>
      </View>
    </Content>
    );
  }
}

const styles = ({
  loginContainer: {
    marginTop: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    width:250
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  loginButton:{
    color: '#FFF'
  }
});

export default LoginAndroid;
