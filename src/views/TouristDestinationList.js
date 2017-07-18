import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Text, Content, Card, CardItem, Body } from 'native-base';
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
                <Body>
                  <Text>{touristDest.name}</Text>
                </Body>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri: touristDest.photo}} style={{height: 200, width: null, flex: 1}}/>
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
