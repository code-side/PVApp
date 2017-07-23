import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Text, Content, Card, CardItem, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class ProvinceList extends Component {

  renderProvinces() {
    console.log(this.props);
    if (this.props.provinces !== undefined) {
      let cards = this.props.provinces.map((prov, indx) => {
        return (
          <TouchableOpacity key={indx} onPress={() => Actions.provInfo({title: prov.name, province: prov})}>
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

export default connect(mapStateToProps, null)(ProvinceList);
