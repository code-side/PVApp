import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Text, Card, CardItem, List, Thumbnail, Left } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class TicoStopList extends Component {

  viewTicoStop(item) {
    Actions.ticoStop({ title: item.name, ticoStop: item });
  }

  renderTicoStops(item) {
    return (
      <TouchableOpacity onPress={()=>this.viewTicoStop(item)}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail square source={{uri: item.photo}} />
              <Text>{item.name}</Text>
            </Left>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Container>
        <List
          dataArray={this.props.ticoStopList}
          renderRow={(item) => this.renderTicoStops(item)}
        />
      </Container>
    );
  }

}

const mapStateToProps = state => {
  return {
    ticoStopList: state.db.staticData.ticoStops
  };
};

export default connect(mapStateToProps)(TicoStopList);
