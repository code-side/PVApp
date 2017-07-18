import React, { Component } from 'react';
import {  Content } from 'native-base';
import { Text, View, TextInput, TouchableOpacity, Button, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { login, saveLoggedUser } from '../actions';

class Login extends Component {

 constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      exist: true
    };
    }

  login = () =>{
    if (this.state.username !== '' && this.state.password !== ''){
      const {username, password, token = this.props.token} = this.state;
      this.props.login({username, password, token}).then(()=>{
        console.log(this.props.user);
        if (this.props.user !== undefined){
          AsyncStorage.setItem('@loggedUser:key', JSON.stringify(this.props.user));
          Actions.home();
        } else {
          this.setState({exist:false});
        }
      });

    } else {
      this.setState({exist:false});
    }
  }

  render() {
    return (
     <Content>
     <View style={styles.loginContainer}>
        <Text style={styles.welcome}>PVApp</Text>
        <View style ={styles.body}>
         <TextInput
          onChangeText={(username) => this.setState({username})}
          placeholder = "Correo"
          value={this.state.username}
        />
        <TextInput
          onChangeText={(password) => this.setState({password})}
          secureTextEntry={true}
          placeholder = "Contraseña"
          value={this.state.password}
        />
        {!this.state.exist && <Text style={{color:'red'}}>Correo o contraseña incorrectos</Text>}
        <TouchableOpacity style={{marginTop:15}}>
          <Text> Olvido su contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:15}} onPress={() => Actions.register()}>
          <Text> Registrarse a la aplicación</Text>
        </TouchableOpacity>

        <Button
        onPress={() => this.login()}
        style={{marginLeft:80,marginTop:15}}
        title="Login"/>


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
    token: state.db.token,
    user: state.db.user
  };
};


export default connect(mapStateToProps, { login, saveLoggedUser })(Login);
