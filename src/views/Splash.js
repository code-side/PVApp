import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { saveTokenToApp, login } from '../actions';
import { connect } from 'react-redux';


class Splash extends Component {
  constructor(props){
    super(props);
    this.props.saveTokenToApp().then(()=>{
        this.verifiedUser();
    }
  );
  }

verifiedUser() {
  AsyncStorage.getItem('@loggedUser:key').then((user)=>{
    if (user !== undefined){
        user = JSON.parse(user);
        const {username = user.email, password, token = this.props.token} = user;
        this.props.login({username, password, token}).then(()=>{
        Actions.home();
        });
    } else {
        Actions.login();
    }
  });
 }
  render(){
    return (
        <View />
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.db.token
  };
};


export default connect(mapStateToProps, { saveTokenToApp, login })(Splash);
