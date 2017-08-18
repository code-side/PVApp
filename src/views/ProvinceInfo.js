import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Text, Content, Button, Tabs, Tab, List, ListItem, Thumbnail, Body } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import I18n from '../services/LanguageService';
import Menu from '../components/Menu';

class ProvinceInfo extends Component {

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
        {/* Header */}
        <Content>
          <Grid>
            <Row style={ styles.header }>
              <Image
                style={{ flex: 1 }}
                source={{ uri: this.props.province.photo }}
              />
            </Row>
          </Grid>

          {/* Layout */}
          <Tabs initialPage={0} style={{flex:1}}>
            <Tab heading="Información">
              <Grid>
                {/* Info */}
                <Row>
                  <Text style={styles.titles}>Historia</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.props.province.history}</Text>
                </Row>

                <Row>
                  <Text style={styles.titles}>Cultura</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.props.province.culture}</Text>
                </Row>

                {/* Cantones */}
                <Row>
                  <Text style={styles.titles}>Cantones</Text>
                </Row>
                <Row>
                  <List
                    dataArray={ this.props.province.cantons }
                    renderRow={ (item) => this.renderCantonItem(item) }/>
                </Row>
              </Grid>
            </Tab>

            {/* Emergency Contacts */}
            <Tab heading="Contactos de emergencia">
              {
                this.props.province.emergencyContacts.length > 0 ?
                (
                  <List
                    dataArray={ this.props.province.emergencyContacts }
                    renderRow={ (item) => this.renderContactItem(item) }/>
                ) : (
                  <Text style={ styles.noItems }>{I18n.t('provinceInfo.noContacts')}</Text>
                )
              }
            </Tab>
          </Tabs>
        </Content>

        <Menu/>
      </Container>
    );
  }
}

export const PROVINCE_ICONS = {
  location: require('../resources/images/prov_location.png'),
  phone: require('../resources/images/prov_phone.png')
};

export const EMERGENCY_ICONS = {
  police: require('../resources/images/em_police.png'),
  crane: require('../resources/images/em_crane.png'),
  firefighters: require('../resources/images/em_firefighters.png'),
  hospital: require('../resources/images/em_hospital.png'),
  ambulance: require('../resources/images/em_ambulance.png'),
  help: require('../resources/images/gen_help.png')
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

export default ProvinceInfo;
