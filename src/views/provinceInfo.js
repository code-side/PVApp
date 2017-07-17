import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Text, Content, Button, Tabs, Tab, List, ListItem, Thumbnail, Body } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import I18n from '../services/languageService';
import { EMERGENCY_ICONS } from './emergencyContact';

export default class ProvinceInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      province: props.province
    };
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
            <Tab heading={I18n.t('provinceInfo.tabs.info')}>
              <Grid>
                {/* Info */}
                <Row>
                  <Text style={styles.titles}>{ I18n.t('provinceInfo.history') }</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.state.province.history}</Text>
                </Row>

                <Row>
                  <Text style={styles.titles}>{ I18n.t('provinceInfo.culture') }</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.state.province.culture}</Text>
                </Row>

                {/* Cantones */}
                <Row>
                  <Text style={styles.titles}>{ I18n.t('provinceInfo.cantons') }</Text>
                </Row>
                <Row>
                  <List
                    dataArray={ this.state.province.cantons }
                    renderRow={ (item) => this.renderCantonItem(item) }/>
                </Row>
              </Grid>
            </Tab>

            {/* Emergency Contacts */}
            <Tab heading={I18n.t('provinceInfo.tabs.contacts')}>
              {
                this.state.province.emergencyContacts.length > 0 ?
                (
                  <List
                    dataArray={ this.state.province.emergencyContacts }
                    renderRow={ (item) => this.renderContactItem(item) }/>
                ) : (
                  <Text style={ styles.noItems }>{I18n.t('noContacts')}</Text>
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
