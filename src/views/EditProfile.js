import React, {Component} from 'react';
import { Thumbnail, Text, Container, Content, Form, Card, CardItem, Left, Right, ActionSheet, Root, List, ListItem, Body, Footer, FooterTab, Button} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, Picker, View, DatePickerAndroid, Dimensions, Modal } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { modifyUser } from '../actions';

var BUTTONS = [ 'Tomar foto', 'Usar icono de la aplicación', 'Cancel' ];
var CANCEL_INDEX = 3;

class EditProfile extends Component {

  constructor(props) {
      super(props);
      this.state = {
      genders_en:[
        {name:'Male', value:'male'},
        {name:'Female',value:'female'},
        {name:'Other',value:'other'},
      ],
      user: this.setNewUser(),
      selectedGender: '',
      birthday: '',
      modalVisible: false
    };
  }

  componentWillMount(){
    ActionSheet.actionsheetInstance = null;
    this.setState({user: this.setNewUser()});
    var birthdayArr = this.state.user.birthday.split('-');
    for (let gender of this.state.genders_en){
      if (gender.value === this.state.user.gender){
        this.setState({selectedGender: gender, birthday:birthdayArr[1] + '/' + birthdayArr[2] + '/' + birthdayArr[0]});
      }
    }
  }

  setNewUser(){
    let newUser = {};
    newUser = {...this.props.user};
    newUser.photo = {...this.props.user.photo};
    return  newUser;
  }

  selectOption =() =>{
    ActionSheet.show(
    {
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX
    },
    buttonIndex => {
     this.setState({ option: BUTTONS[buttonIndex] }, function(){
       if (this.state.option === 'Tomar foto'){
         this.takePhoto();
       } else {
         this.setState({ modalVisible: true });
       }
     });

    });

  }

  takePhoto(){
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      //console.log(image);
      // this.props.registrationUser.photo = { url:`data:${image.mime};base64,` + image.data};
      // console.log(this.props.registrationUser);
     //this.registerUser();
    });
  }
  openDatePicker = async () =>{
    let userBirthDay;
    if (this.state.user.birthday !== null){
       userBirthDay = new Date(this.state.user.birthday);
    } else {
      userBirthDay = new Date();
    }
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
          date: userBirthDay,
          maxDate: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.state.user.birthday = new Date(year, month, day);
        this.setState({birthday: (month + 1) + '-' + day + '-' + year});
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  setGender = (selectedGender) =>{
    let user = {...this.state.user, gender: selectedGender.value};
    this.setState({ user:  user, selectedGender: selectedGender});
  }

  saveUser(){
    const {token = this.props.token, user = this.state.user} = {};
    console.log(this.state.user);
    this.props.modifyUser({token, user}).then(()=>{
      Actions.pop();

    });
  }

  cancelEdit =()=>{
    Actions.pop();
  }
  saveUserDefaultIcon(visible, url){
    this.state.user.photo.url = url;
    this.setState({modalVisible: visible});
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

render() {
  var {height} = Dimensions.get('window');
  let genders = this.state.genders_en.map((f, i) => {
    return <Picker.Item key={i} value={f} label={f.name} />;
  });
    return (
    <Root>
    <Container>
      <Content>
        <Form>
        <Card style={{height: height}}>
          <CardItem>
            <Left>
              <Icon name= "times" onPress={()=> this.cancelEdit()} size={20}/>
            </Left>
            <Right>
            <Text onPress={() => this.saveUser()}>Done</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Left>
              <Text style={styles.userName}>{this.state.user.name}</Text>
            </Left>
            <Content padder>
            <TouchableOpacity onPress={()=> this.selectOption()}>
              <Thumbnail large source={{uri: this.state.user.photo.url}} />
            </TouchableOpacity>
            </Content>
          </CardItem>

          <View style={styles.cardItem}>
            <Text style={styles.titles}>Género:</Text>
            <Picker
              selectedValue={this.state.selectedGender}
              onValueChange={(selectedGender, itemIndex) => this.setGender(selectedGender)}>
                {genders}
            </Picker>
          </View>

          <View style={styles.cardItem}>
            <Text style={styles.titles}  onPress={this.openDatePicker}>Fecha de nacimiento:</Text>
            <Text style={styles.text}  onPress={this.openDatePicker}>{this.state.birthday}</Text>
          </View>

        </Card>
       </Form>
       <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
          >
        <Container>
        <Content>
          <List>
            <ListItem avatar>
            <TouchableOpacity onPress={() => {
              this.saveUserDefaultIcon(!this.state.modalVisible, 'https://www.shareicon.net/data/2015/09/20/104335_avatar_512x512.png');
            }}>

              <Thumbnail source={{ uri: 'https://www.shareicon.net/data/2015/09/20/104335_avatar_512x512.png' }} />
              <Body>
                <Text>Ninja</Text>
                <Text note>A wild ninja appears . .</Text>
               </Body>
             </TouchableOpacity>
            </ListItem>

            <ListItem avatar>
            <TouchableOpacity onPress={() => {
              this.saveUserDefaultIcon(!this.state.modalVisible, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Creative-Tail-People-wonder-women.svg/2000px-Creative-Tail-People-wonder-women.svg.png');
            }}>

              <Thumbnail source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Creative-Tail-People-wonder-women.svg/2000px-Creative-Tail-People-wonder-women.svg.png' }} />
              <Body>
                <Text>Wonder woman</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
               </Body>
             </TouchableOpacity>
            </ListItem>
            </List>
          </Content>
          <Footer>
             <FooterTab>
              <Button block info onPress={()=> this.setModalVisible(false)} active badge vertical>
                <Text>Cancelar</Text>
              </Button>
              </FooterTab>
          </Footer>
         </Container>
        </Modal>
   </Content>
</Container>
</Root>
    );
  }

}

const styles = {
  cardItem: {
    paddingBottom:25
  },
  titles: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  text: {
    marginLeft: 10,
    fontSize: 16
  },
  userName:{
    fontSize:25,
    fontWeight: 'bold'
  }

};

const mapStateToProps = state => {
  return {
    user: state.db.user,
    token: state.db.token
  };
};

export default connect(mapStateToProps, {modifyUser})(EditProfile);
