import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Content,List, ListItem,  Text } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from  'react-native-router-flux';
import { saveLoggedUser } from '../actions';


class AppSettings extends Component {
  closeSession =() =>{
    console.log('gg');
    AsyncStorage.removeItem('@loggedUser:key').then(()=>{
      console.log('pressed')
      this.props.saveLoggedUser(undefined);
      Actions.login();
    });
  }

  render(){
    return (
      <Container>
        <Content>
        <List>
            <ListItem itemDivider>
            <Text onPress={()=> this.closeSession()}>Cerrar sesión</Text>
            </ListItem>
        </List>
        </Content>
      </Container>
    );
  }
}

export default connect(null, { saveLoggedUser})(AppSettings);
