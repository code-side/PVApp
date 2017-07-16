import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { welcome } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class Home extends Component {

  componentWillMount() {
    this.props.welcome('Welcome to PVApp!');
    console.log(this.props.data);
  }

  render(){
    return (
      <View>
        <Text>{this.props.data}</Text>
        <Text onPress={() => Actions.provList()} style={{fontSize:24, fontWeight:'bold'}}>Ver provincias bonitas</Text>
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
