import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Text, Card, List, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Moment from 'moment';

export default class TouristicInterestList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ticoStopList: props.ticoStopList || this.getDefault()
    };
  }

  getDefault() {
    Moment.locale('es');
    var Tico_Stop_List = [
      {
        _id: 1234,
        name: 'Adobe rent a car',
        type: 'Rent a car',
        working_hours: 'L-V de 8am a 5pm',
        contact: '8888-8888',
        address: 'Avenida central',
        coordinates: '9.6328645,-82.6582748',
        logo: 'http://www.parajesdetiquicia.com/adobe_rent_a_car_costa_rica/adobe_rent_a_car_costa_rica_logo.gif',
        province:
        {
          province_id: 1234,
          name: 'San José',
          canton: 'San José'
        },
        reviews: [
          {
            comment: 'Muy buen servicio al cliente',
            rating: 4,
            user: {
              user_id: 1234,
              name: 'Deus',
              photo: 'https://www.ischool.berkeley.edu/sites/default/files/default_images/avatar.jpeg'
            },
            published: Moment('3-7-2017', 'DD-MM-YYYY').fromNow(),
            reported: 0
          },
          {
            comment: 'Son lo peor, kys!',
            rating: 1,
            user: {
              user_id: 4567,
              name: 'Alomatics',
              photo: 'https://www.ischool.berkeley.edu/sites/default/files/default_images/avatar.jpeg'
            },
            published: Moment('4-7-2017', 'DD-MM-YYYY').fromNow(),
            reported: 0
          }
        ]
      },
      {
        _id: 1234,
        name: 'Adobe rent a car',
        type: 'Rent a car',
        working_hours: 'L-V de 8am a 5pm',
        contact: '8888-8888',
        address: 'Avenida central',
        coordinates: '9.6328645,-82.6582748',
        logo: 'http://www.parajesdetiquicia.com/adobe_rent_a_car_costa_rica/adobe_rent_a_car_costa_rica_logo.gif',
        province:
        {
          province_id: 1234,
          name: 'San José',
          canton: 'San José'
        },
        reviews: [
          {
            comment: 'Muy buen servicio al cliente',
            rating: 4,
            user: {
              user_id: 1234,
              name: 'Deus',
              photo: 'https://www.ischool.berkeley.edu/sites/default/files/default_images/avatar.jpeg'
            },
            published: Moment('3-7-2017', 'DD-MM-YYYY').fromNow(),
            reported: 0
          },
          {
            comment: 'Son lo peor, kys!',
            rating: 1,
            user: {
              user_id: 4567,
              name: 'Alomatics',
              photo: 'https://www.ischool.berkeley.edu/sites/default/files/default_images/avatar.jpeg'
            },
            published: Moment('4-7-2017', 'DD-MM-YYYY').fromNow(),
            reported: 0
          }
        ]
      }
    ];
      return Tico_Stop_List;
  }

  viewTouristicInterest(item) {
    Actions.touristicInterest({ title: item.name, ticoStop: item });
  }

  renderTicoStops(item) {
    return (
      <Card>
        <TouchableOpacity onPress={()=>this.viewTouristicInterest(item)}>
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
