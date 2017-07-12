import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { welcome } from '../actions';
import { connect } from 'react-redux';

class Home extends Component {

  componentWillMount() {
    this.props.welcome('Welcome to PVApp!');
    console.log(this.props.data);
  }
  render(){
    return (
      <View>
        <Text>{this.props.data}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.db.msg
  };
};

export default connect(mapStateToProps, { welcome })(Home);
