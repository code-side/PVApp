import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Text, Content, Card, CardItem, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { selectProvince } from '../actions';

class ProvinceList extends Component {

  openProvince(province) {
    this.props.selectProvince(province);
    Actions.provInfo();
  }

  renderProvinces() {
    if (this.props.provinces !== undefined) {
      let cards = this.props.provinces.map((prov, indx) => {
        return (
          <TouchableOpacity key={indx} onPress={() => this.openProvince(prov)}>
            <Card>
              <CardItem>
                <Body>
                  <Text>{prov.name}</Text>
                </Body>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri: prov.photo}} style={{height: 200, width: null, flex: 1}}/>
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
          {this.renderProvinces()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    provinces: state.db.staticData.provinces
  };
};

export default connect(mapStateToProps, { selectProvince })(ProvinceList);
