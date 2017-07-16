import React, {Component } from 'react';
import { DatePickerAndroid, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import { Container, Content, Form, Item, Input, Label, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


class Register extends Component {



  openDatePicker = async () =>{
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(2020, 4, 25)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  continue = () =>{
    Actions.registerProfilePicture();
  }

  render(){
    return(
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
            <Label>Nombre</Label>
            <Input />
            </Item>
            <Item stackedLabel>
            <Label>Correo</Label>
            <Input />
            </Item>
            <TouchableOpacity style={{marginTop:10}} onPress={this.openDatePicker}>
              <Text> Fecha de  nacimiento <Icon name="birthday-cake" size={20}/> :</Text>
            </TouchableOpacity>
          </Form>

          <Button block info onPress={()=> this.continue()}>
            <Text>Continuar</Text>
          </Button>


        </Content>
      </Container>


    )
  }

}

export default Register;
