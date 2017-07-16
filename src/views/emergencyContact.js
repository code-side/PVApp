import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Container, Header, Text, Title, Content, Button, Left, Thumbnail, Body, Icon } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';

export default class EmergencyContact extends Component {

  constructor(props) {
    super(props);

    this.state = {
      contact: props.contact || this.getDefault()
    };
  }

  getDefault() {
    var contact = {
      name: 'Policia Municipal',
      type: 'police',
      contact: '911',
      workingHours: '24/7'
    };

    return contact;
  }

  invoke(type, resource) {
    if (Linking.canOpenURL(type + ':' + resource)) {
      Linking.openURL(type + ':' + resource);
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>Contacto de emergencia</Title>
          </Body>
        </Header>

        <Content>
          <Grid style={ styles.thumbnail }>
            <Row>
              <Thumbnail large source={ EMERGENCY_ICONS[this.state.contact.type.toLowerCase()] }/>
            </Row>

            <Row>
              <Text style={ styles.title }>{ this.state.contact.name }</Text>
            </Row>

            <Row style={{paddingTop: 30}}>
              <Text>Horario: { this.state.contact.workingHours }</Text>
            </Row>

            <Row style={{paddingTop: 10}}>
              <Text>Contacto: { this.state.contact.contact }</Text>
            </Row>

            <Row style={{paddingTop: 50}}>
              <Button style={ styles.buttonMargin } onPress={() => this.invoke('geo', this.state.contact.coordinates)}>
                <Text style={ styles.buttonText }>Abrir Ubicacion</Text>
              </Button>

              <Button style={ styles.buttonMargin } onPress={() => this.invoke('tel', this.state.contact.contact)}>
                <Text style={ styles.buttonText }>Llamar</Text>
              </Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export const EMERGENCY_ICONS = {
  police: require('../resources/images/em_police.png'),
  crane: require('../resources/images/em_crane.png'),
  firefighters: require('../resources/images/em_firefighters.png'),
  hospital: require('../resources/images/em_hospital.png'),
  ambulance: require('../resources/images/em_ambulance.png'),
  help: require('../resources/images/gen_help.png')
};

const styles = {
  thumbnail: {
    alignItems:'center',
    paddingTop: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonMargin: {
    width: 140,
    marginLeft: 10,
    marginRight: 10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1
  }
};
