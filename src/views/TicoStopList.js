import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Text, Card, List, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ticoStopList } from 'actions';

class TicoStopList extends Component {

  viewTicoStop(item) {
    Actions.ticoStop({ title: item.name, ticoStop: item });
  }

  renderTicoStops(item) {
    return (
      <Card>
        <TouchableOpacity onPress={()=>this.viewTicoStop(item)}>
            <Thumbnail square source={{uri: item.photo}} />
            <Text>{item.name}</Text>
        </TouchableOpacity>
      </Card>
    );
  }

  render() {
    return (
      <Container>
        <List
          dataArray={this.state.ticoStopList}
          renderRow={(item) => this.renderTicoStops(item)}
        />
      </Container>
    );
  }

}

const mapStateToProps = state => {
  return {
    token: state.db.token,
    ticoStopList: state.db.ticoStopList
  };
};

export default connect(mapStateToProps, { ticoStopList })(TicoStopList);
