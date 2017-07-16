import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { welcome } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class Home extends Component {

  componentWillMount() {
    this.props.welcome('Welcome to PVApp!');
  }

  ticoStopList() {
    Actions.ticoStopList();
  }

  touristicInterestList() {
    Actions.touristicInterestList();
  }

  render(){
    return (
      <View>
        <Text>{this.props.data}</Text>
        <TouchableOpacity onPress={()=>this.ticoStopList()}>
          <Text>
            Ver tico stops
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.touristicInterestList()}>
          <Text>
            Ver interes turistico
          </Text>
        </TouchableOpacity>
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
