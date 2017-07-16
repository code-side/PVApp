import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { saveToken } from '../actions';
import { connect } from 'react-redux';

class Home extends Component {

  componentWillMount() {
    //this.props.welcome('Welcome to PVApp!');
    console.log(this.props);
  }
  render(){
    return (
      <View>
        <Text>{this.props.token}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.db.msg,
    token: state.db.token
  };
};

export default connect(mapStateToProps, { saveToken })(Home);
