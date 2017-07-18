import React, { Component } from 'react';
import { Text } from 'react-native';
import { saveToken } from '../actions';
import { connect } from 'react-redux';
import {Container, Content, Footer, FooterTab, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';


class Home extends Component {

  render(){
    return (
      <Container>
      <Content>
        <Text>{this.props.token}</Text>
        <Text onPress={() => Actions.provList()}>Ver provincias</Text>
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
