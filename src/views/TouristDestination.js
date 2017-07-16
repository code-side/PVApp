import React, { Component } from 'react';
import { Image, Linking} from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Text, Content, Button, Tabs, Tab, List, Thumbnail, Left, Body, Icon, Card, CardItem, Right } from 'native-base';


class TouristDestination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      touristDest: props.touristDest || this.getDefault()
    };
  }
  getDefault() {
    var touristD = {
      name: 'Manzanillo',
      province: 'Limón',
      photo: 'https://www.costarica.com/contentAsset/image/98a636e4-8f43-447e-b564-7f50a962b6a1/fileAsset/filter/Resize,Jpeg/resize_w/1000/Jpeg_q/.8/',
      description: 'Manzanillo esta ubicado a 4 horas en carro desde la capital San José y al sur del famoso Parque Nacional Cahuita. Sus playas están consideradas como una de las más pintorescas de Costa Rica, con un clima fantástico alrededor de todo el año.',
      location: '9.6328645,-82.6582748',
      services: [
      {
        name: 'Hoteles',
        type: 'hotel',
      },
      {
        name: 'Restaurantes',
        type: 'restaurant',
      },
      {
        name: 'Supermercados',
        type: 'supermarket',
      },
      {
        name: 'WiFi',
        type: 'wifi',
      },
      ]
    };

    return touristD;
  }
  renderTDestItem(destination) {
    return (
      <Card style={{flex: 0}}>
      <CardItem style={{ flexDirection: 'row'}}>
        <Thumbnail square style={styles.icons} source={ TOURISTDEST_ICONS[destination.type] } />
        <Text>{ destination.name }</Text>
      </CardItem>
      </Card>
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
        {/* AppHeader */}
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
        </Header>

        <Content>
          <Grid>
            <Row style={ styles.header }>
              <Image
                style={{ flex: 1 }}
                source={{ uri: this.state.touristDest.photo }}
              />
            </Row>
            <Row style={{ backgroundColor:'#5069c3' }}>
              <Text style={styles.mainTitle}>{ this.state.touristDest.name }</Text>
            </Row>
          </Grid>
          <Tabs initialPage={0} style={{flex:1}}>
            <Tab heading="Información">

                {/* Info */}
                <Card>
                  <CardItem>
                    <Left>
                    <Text style={styles.titles}>Provincia:</Text>
                    <Text style={styles.textContainer}>{this.state.touristDest.province}</Text>
                    </Left>

                    <Right>
                      <Thumbnail
                      square
                      source={ TOURISTDEST_ICONS.flag }
                      style={ styles.listButton }
                      />
                    </Right>
                  </CardItem>

                <CardItem>
                <Body>
                  <Text style={styles.titles}>Descripción:</Text>
                  <Text style={styles.textContainer}>{this.state.touristDest.description}</Text>
                </Body>
                 </CardItem>

                 <CardItem>
                  <Body>
                  <Text style={styles.titles}>Servicios:</Text>
                  </Body>
                </CardItem>

               <CardItem>
                <List
                   dataArray={ this.state.touristDest.services }
                   renderRow={ (item) => this.renderTDestItem(item) }
                />
               </CardItem>

               <CardItem>
               <Body>
                 <Text style={styles.titles}>Ubicación:</Text>
                </Body>
                <Button transparent onPress={() => this.invoke('geo', this.state.touristDest)}>
                  <Thumbnail square small source={ TOURISTDEST_ICONS .location } style={ styles.listButton } />
                </Button>
                </CardItem>
                <Button transparent>
                  <Text>Añadir a lista por visitar</Text>
                </Button>
              </Card>
            </Tab>

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
wifi: require('../resources/images/td_wifi.png'),
flag: require('../resources/images/flag.png')
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
