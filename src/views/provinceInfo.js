import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Header, Text, Content, Button, Tabs, Tab, List, ListItem, Thumbnail, Left, Body, Icon } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { EMERGENCY_ICONS } from './emergencyContact';

export default class ProvinceInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      province: props.province || this.getDefault()
    };
  }

  getDefault() {
    var prov = {
      name: 'San José',
      photo: 'http://s2.eestatic.com/2016/05/17/actualidad/Actualidad_125498519_5032260_1706x960.jpg',
      history: 'Juan de Cavallón funda en 1561 el primer poblado español, la ciudad de Garcimuñoz, en el valle de Santa Ana. A finales del siglo XVI se pobló el valle de Aserrí y su principal centro de población fue nombrado Mata Redonda. Para facilitar el tránsito entre San Bartolomé de Barva y Aserrí o Curridabat, se creó el sitio llamado Boca del Monte. La primera ermita de adobe, así como las primeras casas que la rodearon se fundó el 21 de mayo de 1737.',
      culture: 'Esta provincia cuenta con una amplia gama de museos, hoteles, restaurantes, parques, centros de conferencias, parques temáticos, modernos centros comerciales de lujo, cines, teatros, galerías, balnearios, estadios y varios lugares para la recreación nocturna y la vida cosmopolita.',
      coordinates: '9.9356124,-84.1484506,13z',
      cantons: [
        'San José',
        'Escazú',
        'Alajuelita',
        'Vásques de Coronado',
        'Moravia',
        'Montes de Oca'
      ],
      emergencyContacts: [
        {
          name: 'Policia Municipal',
          type: 'police',
          contact: '911',
          workingHours: '24/7',
          coordinates: '9.9368345,-84.1099237,17z'
        },
        {
          name: 'Guia telefonica',
          type: 'help',
          contact: '110',
          workingHours: '24/7',
          coordinates: '9.9356124,-84.1484506,13z'
        },
        {
          name: 'Servicio Grua',
          type: 'crane',
          contact: '70477349',
          workingHours: 'L-V de 8am a 5pm',
          coordinates: '9.9356124,-84.1484506,13z'
        }
      ]
    };

    return prov;
  }

  renderCantonItem(canton) {
    return (
      <ListItem>
        <Body>
          <Text>{ canton }</Text>
        </Body>
      </ListItem>
    );
  }

  renderContactItem(contact) {
    return (
      <ListItem>
        <Thumbnail square size={80} source={ EMERGENCY_ICONS[contact.type] } />
        <Body>
          <Text>{ contact.name }</Text>
          <Text note>{ contact.contact }</Text>
        </Body>
        <Button transparent onPress={() => this.invoke('geo', contact.coordinates)}>
          <Thumbnail square small source={ PROVINCE_ICONS.location } style={ styles.listButton } />
        </Button>
        <Button transparent onPress={() => this.invoke('tel', contact.contact)} style={ styles.listButton }>
          <Thumbnail square small source={ PROVINCE_ICONS.phone } />
        </Button>
      </ListItem>
    );
  }

  invoke(type, resource) {
    if (Linking.canOpenURL(type + ':' + resource)) {
      Linking.openURL(type + ':' + resource);
    }
  }

  render() {
    return (
      <Container>
        {/* AppHeader */}
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
        </Header>

        {/* Header */}
        <Content>
          <Grid>
            <Row style={ styles.header }>
              <Image
                style={{ flex: 1 }}
                source={{ uri: this.state.province.photo }}
              />
            </Row>
            <Row style={{ backgroundColor:'#5069c3' }}>
              <Text style={styles.mainTitle}>{ this.state.province.name }</Text>
            </Row>
          </Grid>

          {/* Layout */}
          <Tabs initialPage={0} style={{flex:1}}>
            <Tab heading="Información">
              <Grid>
                {/* Info */}
                <Row>
                  <Text style={styles.titles}>Historia:</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.state.province.history}</Text>
                </Row>

                <Row>
                  <Text style={styles.titles}>Cultura:</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.state.province.culture}</Text>
                </Row>

                {/* Cantones */}
                <Row>
                  <Text style={styles.titles}>Cantones:</Text>
                </Row>
                <Row>
                  <List
                    dataArray={ this.state.province.cantons }
                    renderRow={ (item) => this.renderCantonItem(item) }/>
                </Row>
              </Grid>
            </Tab>

            {/* Emergency Contacts */}
            <Tab heading="Contactos emergencia">
              {
                this.state.province.emergencyContacts.length > 0 ?
                (
                  <List
                    dataArray={ this.state.province.emergencyContacts }
                    renderRow={ (item) => this.renderContactItem(item) }/>
                ) : (
                  <Text style={ styles.noItems }>No hay contactos</Text>
                )
              }
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}

export const PROVINCE_ICONS = {
  location: require('../resources/images/prov_location.png'),
  phone: require('../resources/images/prov_phone.png')
};

const styles = {
  header: {
    flex: 1,
    height: 200
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color: 'white',
    flex: 1
  },
  titles: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  textContainer: {
    fontSize: 14,
     paddingLeft: 10,
     paddingRight: 10,
     textAlign: 'justify',
     flexWrap: 'wrap'
  },
  listItem: {
    padding: 10,
    marginLeft: 10
  },
  noItems: {
    padding: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
};
