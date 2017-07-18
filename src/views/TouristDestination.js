import React, { Component } from 'react';
import { Image, Linking, TouchableOpacity} from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Text, Content, Button, Tabs, Tab, List, Thumbnail, Left, Body, Icon, Card, CardItem, Right, ListItem } from 'native-base';
import I18n from '../services/languageService';


class TouristDestination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddToVisit: false
      };
      console.log(this.props);
  }


  renderTDestItem(attribute) {
    return (
      <ListItem>
          <Text>{ attribute.name }</Text>
    </ListItem>
    );
  }
  invoke(type, resource) {
    if (Linking.canOpenURL(type + ':' + resource.location)) {
      Linking.openURL(type + ':' + resource.location);
    }
  }

  noItems(text) {
    return (<Text style={styles.noItems}>{text}</Text>);
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
                source={{ uri: this.props.touristDest.photos[0] }}
              />
            </Row>
            <Row style={{ backgroundColor:'#5069c3' }}>
              <Text style={styles.mainTitle}>{ this.props.touristDest.name }</Text>
            </Row>
          </Grid>

          {/* Layout */}
          <Tabs initialPage={0} style={{flex:1}}>
              <Grid>
                {/* Info */}
                <Row>
                  <Text style={styles.titles}>Provincia</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.props.touristDest.province.name}</Text>
                </Row>

                <Row>
                  <Text style={styles.titles}>Descripción</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.props.touristDest.description}</Text>
                </Row>
                <Row>
                  <Text style={styles.titles}>Servicios}</Text>
                </Row>
                <Row>
                  <List
                    dataArray={ this.props.touristDest.attributes}
                    renderRow={ (item) => this.renderTDestItem(item) }/>
                </Row>
              </Grid>

               <CardItem>
               <Body>
                 <Text style={styles.titles}>Ubicación:</Text>
                </Body>
                <TouchableOpacity onPress={() => this.invoke('geo', this.props.touristDest)}>
                  <Thumbnail square small source={ TOURISTDEST_ICONS .location } style={ styles.listButton } />
                </TouchableOpacity>
                </CardItem>
                 <Button transparent>
                 {this.state.isAddToVisit ? <Text style={{color:'red'}}>Remover de lista por visitar</Text> : <Text>Añadir a lista por visitar</Text>}
                 </Button>

            <Tab heading="Fotos" />
            <Tab heading="Comentarios" />
          </Tabs>
        </Content>
      </Container>
    );
  }
}

export const TOURISTDEST_ICONS = {
hotel: require('../resources/images/td_hotel.png'),
location: require('../resources/images/prov_location.png'),
restaurant: require('../resources/images/td_rest.png'),
supermarket: require('../resources/images/td_supermarket.png'),
wifi: require('../resources/images/td_wifi.png')
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
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  buttonMargin: {
    width: 140,
    marginLeft: 10,
    marginRight: 10
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1
  },
  listButton: {
    width:16,
    height:16
  },
  icons: {
    width:32,
    height: 32,
    marginRight:5
  }
};

export default TouristDestination;
