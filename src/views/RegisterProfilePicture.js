import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, AsyncStorage } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Container, Content, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { regiseterUser } from '../actions';
import { Actions } from 'react-native-router-flux';

class RegisterProfilePicture extends Component {



  constructor(props){
    super(props);
    this.state  = {
      confirmation: true
    };

  }

  takePicture() {
  //   cloudinary.uploader.upload('http://www.example.com/image.jpg', function(result) {
  //     console.log(result);
  // });
  }
  registerUser =() =>{
    const { token = this.props.token, user = this.props.user} = {};
    this.props.regiseterUser({token, user}).then(() =>{
      if (this.props.user !== undefined){
        AsyncStorage.setItem('@loggedUser:key', JSON.stringify(this.props.user));
        Actions.home();
      } else {
        this.setState({exist:false});
      }
    });
  }

  render(){
    return (
      <Container>
      <Content>

       <View>
        {this.state.confirmation ?
        <View style={styles.modalConfirmation}>
        <Text > Desea tomar foto de perfil? </Text>
        <View style={{flexDirection: 'row', justifyContent:'space-between', margin:5}}>
          <Button transparent info onPress={() => this.registerUser()}>
            <Text>Más tarde</Text>
          </Button>
          <Button transparent info onPress={() => this.takePicture()}>
            <Text>Si</Text>
          </Button>
        </View>
       </View> : <View />
      }
      </View>
       </Content>
       </Container>
    );
  }
}

const styles = StyleSheet.create({
preview: {
 flex: 1,
 justifyContent: 'flex-end',
 alignItems: 'center',
 height: Dimensions.get('window').height - 78,
 width: Dimensions.get('window').width
},
capture: {
  flex: 0,
  backgroundColor: '#fff',
  borderRadius: 5,
  color: '#FFF',
  padding: 10,
  margin: 40
},
modalConfirmation: {
  backgroundColor: '#fff',
  height: 100,
  width:  Dimensions.get('window').width,
  marginBottom: Dimensions.get('window').height / 2

}
});

const mapStateToProps = state => {
  return {
    token: state.db.token,
    user: state.db.user
  };
};

export default connect(mapStateToProps, { regiseterUser })(RegisterProfilePicture);
