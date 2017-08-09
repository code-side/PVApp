import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Text, Card, CardItem, Left, List, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class TouristicInterestList extends Component {

  viewTouristicInterest(item) {
    Actions.touristicInterest({ title: item.name, touristicInterest: item });
  }

  renderTouristicInterest(item) {
    return (
      <TouchableOpacity onPress={()=>this.viewTouristicInterest(item)}>
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
          dataArray={this.props.turisticInterestList}
          renderRow={(item) => this.renderTouristicInterest(item)}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    turisticInterestList: state.db.staticData.touristicInterests
  };
};

export default connect(mapStateToProps)(TouristicInterestList);
