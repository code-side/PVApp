import React, {Component} from 'react';
import { Thumbnail, Text, Container, Content, Form, Card, CardItem, Left, Right, Body} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, Picker, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { modifyUser } from '../actions';

class EditProfile extends Component {
  constructor(props) {
      super(props);
      this.state = {
      genders_en:[
        {name:'Seleccione un genero', value:''},
        {name:'Male', value:'male'},
        {name:'Female',value:'female'},
        {name:'Other',value:'other'},
      ],
      selectedGender: ''
    };
  }

  componentWillMount(){
    for (let gender of this.state.genders_en){
      if (gender.value === this.props.user.gender){
        this.setState({selectedGender: gender});
      }
    }
  }


  takePhoto(){
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      console.log(image);
      // this.props.registrationUser.photo = { url:`data:${image.mime};base64,` + image.data};
      // console.log(this.props.registrationUser);
      //this.registerUser();
    });
  }

  setGender = (selectedGender) =>{
    let user = {...this.state.user, gender: selectedGender.value};
    this.setState({ user:  user, selectedGender: selectedGender});
    this.props.user.gender = selectedGender.value;
  }

  saveUser(){
    const {token = this.props.token, user = this.props.user} = {};
    this.props.modifyUser({token, user}).then(()=>{
      Actions.pop();
    });
  }

  cancelEdit =()=>{
    Actions.pop();
  }

render() {
  let genders = this.state.genders_en.map((f, i) => {
    return <Picker.Item key={i} value={f} label={f.name} />;
  })
    return (
    <Container>
      <Content>
        <Form>
        <Card>
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
              <Text style={styles.userName}>{this.props.user.name}</Text>
            </Left>
            <TouchableOpacity onPress={()=> this.takePhoto()}>
              <Thumbnail large source={{uri: this.props.user.photo.url}} />
            </TouchableOpacity>
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
            <Text style={styles.titles}>Nacionalidad:</Text>
            <Text style={styles.text}>{this.props.user.nationality}</Text>
          </View>

          <View style={styles.cardItem}>
            <Text style={styles.titles}>Email:</Text>
            <Text style={styles.text}>{this.props.user.email}</Text>
           </View>

          <View style={styles.cardItem}>
            <Text style={styles.titles}>Fecha de nacimiento:</Text>
            <Text style={styles.text}>{this.props.user.birthday}</Text>
          </View>

          <View style={styles.cardItem}>
            <Text style={styles.titles}>Fecha de registro:</Text>
            <Text style={styles.text}>{this.props.user.registrationDate}</Text>
          </View>

        </Card>
       </Form>
   </Content>
</Container>
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
