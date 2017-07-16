import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Text, Content, Card, CardItem, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class ProvinceList extends Component {

  constructor(props) {
    super(props);

    this.provinces = [
      {
        name: 'San Jose',
        photo: 'http://s2.eestatic.com/2016/05/17/actualidad/Actualidad_125498519_5032260_1706x960.jpg',
        history: 'Juan de Cavallón funda en 1561 el primer poblado español, la ciudad de Garcimuñoz, en el valle de Santa Ana. A finales del siglo XVI se pobló el valle de Aserrí y su principal centro de población fue nombrado Mata Redonda. Para facilitar el tránsito entre San Bartolomé de Barva y Aserrí o Curridabat, se creó el sitio llamado Boca del Monte. La primera ermita de adobe, así como las primeras casas que la rodearon se fundó el 21 de mayo de 1737.'
      },
      {
        name: 'Cartago',
        photo: 'http://s2.eestatic.com/2016/05/17/actualidad/Actualidad_125498519_5032260_1706x960.jpg',
        history: 'Lorem ipsum'
      },
      {
        name: 'Hederia',
        photo: 'http://s2.eestatic.com/2016/05/17/actualidad/Actualidad_125498519_5032260_1706x960.jpg',
        history: 'Lorem ipsum'
      },
      {
        name: 'Limon',
        photo: 'http://s2.eestatic.com/2016/05/17/actualidad/Actualidad_125498519_5032260_1706x960.jpg',
        history: 'Lorem ipsum'
      },
      {
        name: 'Guanacaste',
        photo: 'http://s2.eestatic.com/2016/05/17/actualidad/Actualidad_125498519_5032260_1706x960.jpg',
        history: 'Lorem ipsum'
      },
      {
        name: 'Puntarenas',
        photo: 'http://s2.eestatic.com/2016/05/17/actualidad/Actualidad_125498519_5032260_1706x960.jpg',
        history: 'Lorem ipsum'
      },
      {
        name: 'Alajuela',
        photo: 'http://s2.eestatic.com/2016/05/17/actualidad/Actualidad_125498519_5032260_1706x960.jpg',
        history: 'Lorem ipsum'
      }
    ];
  }

  renderProvinces() {
    let cards = this.provinces.map((prov, indx) => {
      return (
        <TouchableOpacity key={indx} onPress={() => Actions.provInfo()}>
          <Card>
            <CardItem>
              <Body>
                <Text>{prov.name}</Text>
              </Body>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: prov.photo}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Text numberOfLines={4}>{prov.history}</Text>
            </CardItem>
          </Card>
        </TouchableOpacity>
      );
    });
    return cards;
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
