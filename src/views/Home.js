import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { saveToken } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class Home extends Component {

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
        <Text>{this.props.token}</Text>
        <Text onPress={() => Actions.provList()}>Ver provincias</Text>

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
