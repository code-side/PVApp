import React, {Component} from 'react';
import {
  Footer,
  FooterTab,
  Button,
  Container,
  Content,
  List,
  ListItem,
  Text,
  Row,
  Card,
  CardItem,
  Left,
  Right,
  Body
} from 'native-base';
import { TouchableOpacity, Image } from 'react-native';
import {saveToken} from '../actions';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

class Home extends Component {

  showMapView() {
    Actions.showMap({title: 'Nearby'});
  }

  changeView =()=>{
    Actions.appSettings();
  }
  renderTouristDestinations() {
    return this.props.touristDestinations.map((touristDest, indx) => {
      return (
        <TouchableOpacity key={indx} onPress={() => Actions.touristDestionation({title:touristDest.name, touristDest:touristDest})}>
          <Card style={{ width: 180, height: 240 }}>
            <CardItem cardBody>
             <Image style={{ flex: 1, height: 150, margin: 5 }} source={{uri: touristDest.photos[0].url}} />
           </CardItem>
           <CardItem>
              <Left>
                <Body>
                  <Text>{touristDest.name}</Text>
                  <Text note>{touristDest.province.name}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </TouchableOpacity>
      );
    });
  }
  emptyCards(){
  return (
    <TouchableOpacity>
    <Card style={{ width: 180, height: 240 }}>
      <CardItem cardBody>
        <Image style={{ flex: 1, height: 150, margin: 5 }} source={{uri: 'https://www.theclementimall.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'}} />
      </CardItem>
      <CardItem>
        <Left>
          <Text style={{paddingLeft:20}}>Loading</Text>
        </Left>
      </CardItem>
    </Card>
    </TouchableOpacity>
  );
  }

  render() {
    return (
      <Container>
        <Content style={{paddingTop:10}}>
          <List>
            <Row>
              <Text style={{fontWeight: 'bold', marginLeft:15}}>
                Destinos turisticos
              </Text>
              <Right>
                <Text style={{marginRight:15, color:'#ACACAC'}} onPress={() => Actions.touristDestionations()}>Ver todos  <Icon name="angle-right" size={20} color="#ACACAC"/></Text>
              </Right>
            </Row>
            <Row>
               {this.props.touristDestinations ? this.renderTouristDestinations() : this.emptyCards()}
            </Row>
            <ListItem onPress={() => Actions.provList()}>
              <Text>
                Ver provincias
              </Text>
            </ListItem>

            <ListItem onPress={() => Actions.ticoStopList()}>
              <Text>
                Ver tico stops
              </Text>
            </ListItem>
            <ListItem onPress={() => Actions.touristicInterestList()}>
              <Text>
                Ver interes turistico
              </Text>
            </ListItem>

          </List>

        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Icon name="home" size={25} color="#FFF"/>
              <Text style={{fontSize:10, fontWeight:'bold'}}>Inicio</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button full>
              <Icon name="heart-o" size={25} color="#FFF"/>
              <Text style={{fontSize:10, fontWeight:'bold'}}>Favortios</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button full onPress={() => this.showMapView()}>
              <Icon name="map-marker" size={25} color="#FFF"/>
              <Text style={{fontSize:10, fontWeight:'bold'}}>Mapa</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button full onPress={()=>this.changeView()}>
              <Icon name="user-o" size={25} color="#FFF"/>
              <Text style={{fontSize:10, fontWeight:'bold'}}>Perfil</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.db.msg,
    touristDestinations: state.db.staticData.touristDestinations,
    token: state.db.token};
};

export default connect(mapStateToProps, {saveToken})(Home);
