import React, {Component} from 'react';
import {
  Footer,
  FooterTab,
  Button,
  Container,
  Content,
  List,
  ListItem,
  Text
} from 'native-base';
import {saveToken} from '../actions';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

class Home extends Component {

  showMapView() {
    Actions.showMap({title: 'Nearby'});
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
          </List>
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
            <Button full>
              <Text>Perfil</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {data: state.db.msg, token: state.db.token};
};

export default connect(mapStateToProps, {saveToken})(Home);
