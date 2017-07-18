import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Text, Content, Card, CardItem, Left, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class TouristDestinationList extends Component {

  renderTouristDestinations() {
    if (this.props.touristDestinations !== undefined) {
      let cards = this.props.touristDestinations.map((touristDest, indx) => {
        return (
          <TouchableOpacity key={indx} onPress={() => Actions.touristDestionation({touristDest: touristDest})}>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail square source={{uri: touristDest.photos[0]}} />
                  <Text>{touristDest.name}</Text>
                </Left>
              </CardItem>
            </Card>
          </TouchableOpacity>
        );
      });
      return cards;
    }
  }

  render() {
    return (
      <Container>
        <Content>
          {this.renderTouristDestinations()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    touristDestinations: state.db.staticData.touristDestinations
  };
};

export default connect(mapStateToProps, null)(TouristDestinationList);
