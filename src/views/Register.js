import React, {Component } from 'react';
import { DatePickerAndroid, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import { Container, Content, Form, Item, Input, Label, Text, Button, Footer, FooterTab } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      user:{
        name: '',
        email: '',
        password: '',
        birthday: '',
        nationality: '',
        gender: ''
      }
    };
  }

  openDatePicker = async () =>{
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(2020, 4, 25)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        console.log(this.state.user);
        let user = {...this.state.user, birthday: 'newDate'}
        console.log(user);
        this.setState({ user:  user});
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  continue = () =>{
    Actions.registerProfilePicture();
  }

  render(){
    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Nombre</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Contraseña</Label>
              <Input />
            </Item>

            <TouchableOpacity style={{marginTop:10}} onPress={this.openDatePicker}>
              <Text> Fecha de  nacimiento <Icon name="birthday-cake" size={20}/> : {this.state.user.birthday}</Text>
            </TouchableOpacity>
          </Form>

        </Content>
        <Footer>
          <FooterTab>
            <Button block info onPress={()=> this.continue()}>
              <Text>Continuar</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>

    );
  }
}

export default Register;
