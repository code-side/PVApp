import React, { Component } from 'react';
import { Button,Body,Content } from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { saveToken } from '../actions'
class Login extends Component {

 constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      exist: true
    };
    this.registerToken();
  }

  registerToken = () =>{
    return fetch('http://192.168.86.206:8080/api/authenticate',{
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
     this.props.saveToken( 'Bearer ' + responseJson.id_token);
  
   })
   .catch((error) => {
     console.error(error);
   });
  }

  login = () =>{
    if(this.state.username !== "" && this.state.password !== "" ){
      this.validateCredentials();
    }else{
      this.setState({exist:false});
    }
  }
  registerView(){
    Actions.register();
  }

  validateCredentials = () =>{
    return fetch('http://192.168.86.206:8080/api/authenticateUser',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.props.token

      },
      body: JSON.stringify(
       {
             username: this.state.username,
             password: this.state.password
      })
    })
    .then((response) => response.json())
    .then(async (responseJson) => {
      Actions.home();
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
        <TouchableOpacity style={{marginTop:15}}>
          <Text> Olvido su contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:15}} onPress={() => this.registerView()}>
          <Text> Registrarse a la aplicación</Text>
        </TouchableOpacity>
        <Button primary style={{marginLeft:80,marginTop:15}}
        onPress={() => this.login()}>
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
    marginTop: 150,
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

const mapStateToProps = state => {
  return {
    data: state.db.msg,
    token: state.db.token
  };
};

export default connect(mapStateToProps, { saveToken })(Login);
