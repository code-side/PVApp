import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Header, Text, Content, Button, Tabs, Tab, Card, List, Thumbnail, CardItem, Body, Left, Right, Icon } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import Moment from 'moment';

export default class TouristicInterest extends Component {

  constructor(props) {
    super(props);

    this.state = {
      touristicInterest: props.touristicInterest || this.getDefault()
    };
  }

  getDefault() {
    Moment.locale('es');
    var Touristic_Interest =
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
    };

    return Touristic_Interest;
  }

  renderReviews(reviews) {
    return (
      <Card>
        <CardItem header>
          <Left>
            <Thumbnail source={COMMENT_ICONS.user} />
            <Body>
              <Text>{reviews.user.name}</Text>
              <Text note>{ reviews.published }</Text>
            </Body>
          </Left>
          <Right>
            <CardItem>
              <Thumbnail
                square
                source={ COMMENT_ICONS.report }
                style={ styles.listButton }
              />
            </CardItem>
            <CardItem style={{ flexDirection: 'row' }}>
              <Text>{reviews.rating}</Text>
              <Thumbnail
                square
                source={ COMMENT_ICONS.full }
                style={ styles.listButton }
              />
            </CardItem>

          </Right>
        </CardItem>

        <CardItem>
          <Body>
            <Text>{ reviews.comment }</Text>
          </Body>
        </CardItem>

      </Card>
    );
  }
  invoke(type, resource) {
    if (Linking.canOpenURL(type + ':' + resource.coordinates)) {
      Linking.openURL(type + ':' + resource.coordinates);
    }
  }

  render() {
    return (
      <Container>
        {/* AppHeader */}
        <Header>
          <Left>
            <Button transparent onPress={() => this.invoke('geo', this.state.touristicInterest)}>
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
                source={{ uri: this.state.touristicInterest.logo }}
              />
            </Row>
            <Row style={{ backgroundColor:'#5069c3' }}>
              <Text style={styles.mainTitle}>{ this.state.touristicInterest.name }</Text>
            </Row>
          </Grid>

          {/* Layout */}
          <Tabs initialPage={0} style={{flex:1}}>
            <Tab heading="Información">
              <Grid>
            {/* Info */}
                <Row>
                  <Text style={styles.titles}>Horario de atención:</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.state.touristicInterest.working_hours}</Text>
                </Row>

                <Row>
                  <Text style={styles.titles}>Contacto:</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.state.touristicInterest.contact}</Text>
                </Row>

                <Row>
                  <Text style={styles.titles}>Ubicación:</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.state.touristicInterest.address}</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.state.touristicInterest.province.canton + ', ' + this.state.touristicInterest.province.name}</Text>
                </Row>
              </Grid>
            </Tab>

            <Tab heading="Comentarios">
              <List
                dataArray={this.state.touristicInterest.reviews}
                renderRow={(item) => this.renderReviews(item)}
              />
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}

export const COMMENT_ICONS = {
  full: require('../resources/images/full.png'),
  report: require('../resources/images/flag.png'),
  user: require('../resources/images/user.jpg')
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
  listButton: {
    width: 16,
    height: 16
  }
};
