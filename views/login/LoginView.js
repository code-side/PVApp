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
      username: "",
      password: "",
      exist: true
    };
  }

  _login = () =>{
    if(this.state.username !== "" && this.state.password !== "" ){
      this.validateCredentials();
    }else{
      this.setState({exist:false});
    }
  }

  validateCredentials = () =>{
    console.log('method');
    return fetch('http://172.20.10.3:8080/api/authenticate',{
     method: "POST",
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(
      {
            username: 'user',
            password: 'user',
            rememberMe: true
     })
  })
   .then((response) => response.json())
   .then(async (responseJson) => {
     console.log(responseJson.id_token);
     return fetch('http://172.20.10.3:8080/api/authenticateUser',{
       method: "POST",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': ' Bearer ' + responseJson.id_token

       },
       body: JSON.stringify(
        {
              username: this.state.username,
              password: this.state.password

       })
    })
     .then((response) => response.json())
     .then(async (responseJson) => {
       console.log(responseJson);
       this.props.goToHomeScreen();
     })
     .catch((error) => {
       console.error(error);
     });
   })
   .catch((error) => {
     console.error(error);
   });
  }

  render() {

    return (

     <Content>
     <View style={styles.loginContainer}>
        <Text style={styles.welcome}>PVApp</Text>
        <View style ={styles.body}>
         <TextInput
          onChangeText={(username) => this.setState({username})}
          placeholder = 'Correo'
          value={this.state.username}
        />
        <TextInput
          onChangeText={(password) => this.setState({password})}
          secureTextEntry={true}
          placeholder = 'Contraseña'
          value={this.state.password}
        />
        {!this.state.exist && <Text style={{color:'red'}}>Correo o contraseña incorrectos</Text>}
        <TouchableHighlight style={{marginTop:15}}>
          <Text> Olvido su contraseña?</Text>
        </TouchableHighlight>
        <Button primary style={{marginLeft:80,marginTop:15}}
        onPress={() => this._login()}>
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
