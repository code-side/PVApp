import React, {Component} from 'react';
import {View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {saveTokenToApp, login, updateConfig, refreshStaticData} from '../actions';
import {connect} from 'react-redux';
import I18n from '../services/languageService';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.loadAppConfig();
    this.props.saveTokenToApp().then(() => {
      this.props.refreshStaticData(this.props.token);
      this.verifiedUser();
    });
  }

  verifiedUser() {
    AsyncStorage.getItem('@loggedUser:key').then((user) => {
      if (user !== null) {
        user = JSON.parse(user);
        const {
          username = user.email,
          password,
          token = this.props.token
        } = user;
        this.props.login({username, password, token}).then(() => {
          Actions.home();
        });
      } else {
        Actions.login();
      }
    });
  }

  loadAppConfig() {
    AsyncStorage.getItem('@app_config:key').then((strConfig) =>{
      if (strConfig !== null) {
        let config = JSON.parse(strConfig);
        this.props.updateConfig(config);
        I18n.locale = config.lang;
      }
    });
  }

  render() {
    return (<View/>);
  }
}

const mapStateToProps = state => {
  return {token: state.db.token};
};

export default connect(mapStateToProps, {saveTokenToApp, refreshStaticData, login, updateConfig})(Splash);
