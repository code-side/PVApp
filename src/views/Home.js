import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Footer, FooterTab, Button, Container, Content } from 'native-base';
import { saveToken } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class Home extends Component {

  render(){
    return (
      <Container>
      <Content>
        <Text onPress={() => Actions.provList()}>Ver provincias</Text>
        <Text onPress={() => Actions.touristDestionations()}>Ver provincias</Text>
        <TouchableOpacity onPress={()=>this.ticoStopList()}>
          <Text>
            Ver tico stops
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.touristicInterestList()}>
          <Text>
            Ver interes turistico
          </Text>
        </TouchableOpacity>
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
         <Button full>
           <Text>Visitados</Text>
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
  return {
    data: state.db.msg,
    token: state.db.token
  };
};

export default connect(mapStateToProps, { saveToken })(Home);
