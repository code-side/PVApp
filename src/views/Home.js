import React, {Component} from 'react';
import {
  Footer,
  FooterTab,
  Button,
  Container,
  Content,
  List,
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
import { selectProvince } from '../actions';

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
  renderTuristicInterestList() {
    return this.props.turisticInterestList.map((turisticInt, indx) => {
      return (
        <TouchableOpacity key={indx} onPress={() => Actions.touristicInterest({title:turisticInt.name, touristicInterest:turisticInt})}>
          <Card style={{ width: 180, height: 240 }}>
            <CardItem cardBody>
             <Image style={{ flex: 1, height: 150, margin: 5 }} source={{uri: turisticInt.photo}} />
           </CardItem>
           <CardItem>
              <Left>
                <Body>
                  <Text>{turisticInt.name}</Text>
                  <Text note>{turisticInt.province.name}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </TouchableOpacity>
      );
    });
  }
  renderTicoStops() {
    return this.props.ticoStopList.map((ticoStop, indx) => {
      return (
        <TouchableOpacity key={indx} onPress={() => Actions.ticoStop({title:ticoStop.name, ticoStop:ticoStop})}>
          <Card style={{ width: 180, height: 240 }}>
            <CardItem cardBody>
             <Image style={{ flex: 1, height: 150, margin: 5 }} source={{uri: ticoStop.photo}} />
           </CardItem>
           <CardItem>
              <Left>
                <Body>
                  <Text>{ticoStop.name}</Text>
                  <Text note>{ticoStop.province.name}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </TouchableOpacity>
      );
    });
  }
  renderProvinces() {
    return this.props.provinces.map((province, indx) => {
      return (
        <TouchableOpacity key={indx} onPress={() => Actions.provInfo({title:province.name, province:province})}>
          <Card style={{ width: 180, height: 240 }}>
            <CardItem cardBody>
             <Image style={{ flex: 1, height: 150, margin: 5 }} source={{uri: province.photo}} />
           </CardItem>
           <CardItem>
              <Left>
                <Body>
                  <Text>{province.name}</Text>
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

            <Row>
              <Text style={{fontWeight: 'bold', marginLeft:15}}>
                Intereses turisticos
              </Text>
              <Right>
                <Text style={{marginRight:15, color:'#ACACAC'}} onPress={() => Actions.touristicInterestList()}>Ver todos  <Icon name="angle-right" size={20} color="#ACACAC"/></Text>
              </Right>
            </Row>
            <Row>
               {this.props.turisticInterestList ? this.renderTuristicInterestList() : this.emptyCards()}
            </Row>

            <Row>
              <Text style={{fontWeight: 'bold', marginLeft:15}}>
                TicoStops
              </Text>
              <Right>
                <Text style={{marginRight:15, color:'#ACACAC'}} onPress={() => Actions.ticoStopList()}>Ver todos  <Icon name="angle-right" size={20} color="#ACACAC"/></Text>
              </Right>
            </Row>
            <Row>
               {this.props.ticoStopList ? this.renderTicoStops() : this.emptyCards()}
            </Row>

            <Row>
              <Text style={{fontWeight: 'bold', marginLeft:15}}>
                Provincias
              </Text>
              <Right>
                <Text style={{marginRight:15, color:'#ACACAC'}} onPress={() => Actions.provList()}>Ver todos  <Icon name="angle-right" size={20} color="#ACACAC"/></Text>
              </Right>
            </Row>
            <Row>
               {this.props.provinces ? this.renderProvinces() : this.emptyCards()}
            </Row>
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
    turisticInterestList: state.db.staticData.touristicInterests,
    ticoStopList: state.db.staticData.ticoStops,
    provinces: state.db.staticData.provinces,
    token: state.db.token};
};

export default connect(mapStateToProps, {saveToken, selectProvince})(Home);
