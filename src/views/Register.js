import React, {Component } from 'react';
import { DatePickerAndroid, TouchableOpacity, Picker, View} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Text, Button, Footer, FooterTab } from 'native-base';
import { Actions } from 'react-native-router-flux';


class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      user:{
        name: '',
        email: '',
        password: '',
        birthday: null,
        nationality: '',
        gender: '',
        photo: null
      },genders_en:[
      {name:'Seleccione un genero', value:''},
      {name:'Male', value:'Male'},
      {name:'Female',value:'Female'},
      {name:'Other',value:'Other'},
    ],
    birthday:'',
    selectedGender:'',
    confirmPassword:'',
    isNameValid: true,
    isEmailValid: true,
    isPasswordValid: true,
    isGenderValid: true,
    isBirthdayValid:true,
    passwordMessage: '',
    };
  }

  openDatePicker = async () =>{
    let userBirthDay;
    if (this.state.user.birthday !== null){
       userBirthDay = this.state.user.birthday;
    } else {
      userBirthDay = new Date();
    }
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
          date: userBirthDay,
          maxDate: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        let user = { ...this.state.user, birthday: new Date(year, month, day) };
        this.setState({birthday: (month + 1) + '/' + day + '/' + year});
        this.setState({ user:  user});
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
  setGender = (selectedGender) =>{
    let user = {...this.state.user, gender: selectedGender.value};
    this.setState({ user:  user, selectedGender: selectedGender});
  }

  continue = () =>{
    if (this.validateUser()){
        Actions.registerProfilePicture({registrationUser:this.state.user});
    }
  }
  validateUser = () =>{
    if (this.validateUserName() && this.validateEmail()  && this.validatePassword() &&
        this.validateGender() && this.validateBirthday()){
      return true;
    }
    return false;
  }
  validateUserName = () =>{
    if (this.state.user.name !== ''){
    var re = /^\w+$/;
    this.setState({isNameValid: re.test(this.state.user.name)});
    return re.test(this.state.user.name);
  }
    this.setState({isNameValid: false});
    return false;
  }

  validateEmail = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({isEmailValid: re.test(this.state.user.email)});
    return re.test(this.state.user.email);
  };

  validatePassword = ()=>{
    if (this.state.user.password !== '' || this.state.confirmPassword !== ''){
      if (this.state.user.password !== this.state.confirmPassword){
        this.setState({passwordMessage:'Las contraseñas no coinciden',isPasswordValid: false});
        return false;
      }
      var re = /^([a-zA-Z])\w{3,}/;
      console.log(re.test(this.state.user.passoword));
      this.setState({isPasswordValid: re.test(this.state.user.email), passwordMessage:'La contraseña debe tener más de 3 caracteres'});
      return re.test(this.state.user.passoword);
    } else {
      this.setState({passwordMessage:'Ingrese una contraseña',isPasswordValid: false});
      return false;
    }
  }

  validateGender = () =>{
    if (this.state.user.gender === ''){
      this.setState({isGenderValid: false});
      return false;
    } else {
      this.setState({isGenderValid: true});
      return true;
    }
  }

  validateBirthday = ()=>{
    if (this.state.user.birthday === null){
      this.setState({isBirthdayValid: false});
      return false;
    }
    this.setState({isBirthdayValid: true});
    return true;
  }


  render(){
    let genders = this.state.genders_en.map((f, i) => {
      return <Picker.Item key={i} value={f} label={f.name} />;
    });
    return (
      <Container>
        <Content>
          <Form>
           <Item stackedLabel>
              <Label>Nombre de usuario</Label>
              <Input
              onChangeText={(name) => this.setState({user : {...this.state.user, name: name}})}
              value={this.state.user.name}/>
            </Item>
             {!this.state.isNameValid && <Label style={{color:'red',marginLeft:15}}>El nombre solo puede contener caracteres</Label>}
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
              onChangeText={(email) => this.setState({user : {...this.state.user, email:email}})}
              value={this.state.user.email}/>
            </Item>
              {!this.state.isEmailValid && <Label style={{color:'red',marginLeft:15}}>Ingrese una dirección de correo valida</Label>}
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
              onChangeText={(confirmPassword) => this.setState({confirmPassword})}
              value={this.state.confirmPassword}
              secureTextEntry={true}/>
            </Item>
            {!this.state.isPasswordValid && <Label style={{color:'red',marginLeft:15}}>{this.state.passwordMessage}</Label>}
            <View style={{marginLeft:15}}>
            <Label>Genero</Label>
            <Picker
              selectedValue={this.state.selectedGender}
              onValueChange={(selectedGender, itemIndex) => this.setGender(selectedGender)}>
                {genders}
            </Picker>
            {!this.state.isGenderValid && <Label style={{color:'red'}}>Seleccione un genero</Label>}
            <TouchableOpacity style={{marginTop:10}} onPress={this.openDatePicker}>
              <Text> Fecha de  nacimiento: {this.state.birthday}</Text>
            </TouchableOpacity>
            {!this.state.isBirthdayValid && <Label style={{color:'red'}}>Seleccione una fecha de nacimiento valida</Label>}
            </View>
          </Form>

        </Content>
        <Footer>
          <FooterTab>
            <Button block info onPress={()=> this.continue()} active badge vertical>
              <Text>Continuar</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>

    );
  }
}

export default Register;
