import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Text, Card, List, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class TicoStopList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ticoStopList: props.ticoStopList || this.getDefault()
    };
  }

  getDefault() {
    var Tico_Stop_List = [
      {
        _id: 1234,
        name: 'Museo Nacional',
        historical_review: 'Una putada muy vieja que hay en chepe centro.',
        coordinates: '9°55′58″N 84°04′17″O',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Vistamuseocr.jpg',
        address: 'La actual localización del museo es el antiguo Cuartel Bellavista.',
        province:{
          province_id: 1234,
          name:'San José',
          canton: 'San José'
        }
      },
      {
        _id: 1234,
        name: 'Museo Nacional',
        historical_review: 'Una putada muy vieja que hay en chepe centro.',
        coordinates: '9°55′58″N 84°04′17″O',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Vistamuseocr.jpg',
        address: 'La actual localización del museo es el antiguo Cuartel Bellavista.',
        province:{
          province_id: 1234,
          name:'San José',
          canton: 'San José'
        }
      }
    ];
      return Tico_Stop_List;
  }

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
