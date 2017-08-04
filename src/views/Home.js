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
  Right
} from 'native-base';
import { TouchableOpacity, Image } from 'react-native';
import {saveToken} from '../actions';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

class Home extends Component {

  showMapView() {
    Actions.showMap({title: 'Nearby'});
  }

  changeView =()=>{
    Actions.appSettings();
  }
  renderTouristDestinations() {
    console.log(this.props.touristDestinations);
    return this.props.touristDestinations.map((touristDest, indx) => {
      return (
        <TouchableOpacity key={indx} onPress={() => Actions.touristDestionation({title:touristDest.name, touristDest:touristDest})}>
          <Card style={{ width: 160, height: 240 }}>
            <CardItem cardBody>
             <Image style={{ flex: 1, height: 150, margin: 5 }} source={{uri: touristDest.photos[0].url}} />
           </CardItem>
           <CardItem>
             <Left>
               <Text style={{textAlign: 'center', flex: 1}}>{touristDest.name}</Text>
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
    <Card style={{ width: 160, height: 240 }}>
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
        <Content>
          <List>
            <ListItem onPress={() => Actions.provList()}>
              <Text>
                Ver provincias
              </Text>
            </ListItem>
            <ListItem onPress={() => Actions.touristDestionations()}>
              <Text>
                Ver destinos turisticos
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
            <ListItem onPress={() => Actions.config()}>
              <Text>
                Configuracion
              </Text>
            </ListItem>
          </List>
            <Row>
              <Text style={{fontWeight: 'bold'}}>
                Destinos turisticos
              </Text>
              <Right>
                <Text onPress={() => Actions.touristDestionations()}>Mostrar todos</Text>
              </Right>
            </Row>
            <Row>
               {this.props.touristDestinations ? this.renderTouristDestinations() : this.emptyCards()}
            </Row>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Inicio</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button full>
              <Text>Favoritos</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button full onPress={() => this.showMapView()}>
              <Text>Mapa</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button full onPress={()=>this.changeView()}>
              <Text>Perfil</Text>
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
