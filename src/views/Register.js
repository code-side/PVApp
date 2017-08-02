import React, {Component } from 'react';
import { DatePickerAndroid, TouchableOpacity, Picker} from 'react-native'
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
      },genders_en:[
      {name:'Seleccione un genero', value:''},
      {name:'Male', value:'Male'},
      {name:'Female',value:'Female'},
      {name:'Other',value:'Other'},
    ],
    birthday:'',
    selectedGender:''
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
        let user = { ...this.state.user, birthday: new Date(year, month, day) }
        this.setState({birthday: month + '/' + day + '/' + year})
        console.log(user);
        this.setState({ user:  user});
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
  setGender = (selectedGender) =>{
    console.log(selectedGender);
    let user = {...this.state.user, gender: selectedGender.value};
    this.setState({ user:  user});
  }

  continue = () =>{
    Actions.registerProfilePicture({user:this.state.user});
  }
  changePass = (pass)=>{
    console.log(pass);
  }

  render(){
    let genders = this.state.genders_en.map( (f, i) => {
      return <Picker.Item key={i} value={f} label={f.name} />
    });
    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Nombre</Label>
              <Input
              onChangeText={(name) => this.setState({user : {...this.state.user, name: name}})}
              value={this.state.user.name}/>
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
              onChangeText={(email) => this.setState({user : {...this.state.user, email:email}})}
              value={this.state.user.email}/>
            </Item>
            <Item stackedLabel>
              <Label>Contraseña</Label>
              <Input
              onChangeText={(password) => this.setState({user : {...this.state.user, password: password}})}
              value={this.state.user.password}
              secureTextEntry={true}/>
            </Item>

            <Item stackedLabel>
              <Label>Confirmar contraseña</Label>
              <Input
              secureTextEntry={true}/>
            </Item>

            <Label>Genero</Label>
            <Picker
              selectedValue={this.state.user.gender}
              onValueChange={(selectedGender, itemIndex) => this.setGender(selectedGender)}>
                {genders}
            </Picker>


            <TouchableOpacity style={{marginTop:10}} onPress={this.openDatePicker}>
              <Text> Fecha de  nacimiento <Icon name="birthday-cake" size={20}/> : {this.state.birthday}</Text>
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
