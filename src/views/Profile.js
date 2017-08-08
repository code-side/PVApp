import React, {Component} from 'react';
import { View } from 'react-native';
//import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
//import I18n from '../services/LanguageService';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<View/>);
  }
}

const mapStateToProps = state => {
  return {token: state.db.user};
};

export default connect(mapStateToProps, null)(Profile);
