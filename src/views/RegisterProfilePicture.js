import React, { Component } from 'react';
import { StyleSheet, Dimensions, Modal, View, TouchableOpacity } from 'react-native';
import Camera from 'react-native-camera';
import { Container, Content, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
class RegisterProfilePicture extends Component {

  constructor(props){
    super(props);
    this.state  = {
      confirmation: true
    }
  }

  takePicture() {
  this.camera.capture()
    .then((data) => console.log(data))
    .catch(err => console.error(err));
  }
  enablePictureMode =()=>{
    this.setState({confirmation: !this.state.confirmation});
  }

  render(){
    return(
      <Container>
      <Content>
      <Camera
       ref={(cam) => {
         this.camera = cam;
       }}
       type = "front"
       style={styles.preview}
       aspect={Camera.constants.Aspect.fill}>
       <View>
        {this.state.confirmation ?
        <View style={styles.modalConfirmation}>
        <Text > Desea tomar foto de perfil? </Text>
        <View style={{flexDirection: 'row', justifyContent:'space-between', margin:5}}>
          <Button transparent info>
            <Text>Más tarde</Text>
          </Button>
          <Button transparent info onPress={() => this.enablePictureMode()}>
            <Text>Si</Text>
          </Button>
        </View>
       </View> : <View></View>
      }
      </View>
        <Text onPress={this.takePicture.bind(this)}><Icon name="camera" size={40}/></Text>
       </Camera>
       </Content>
       </Container>
    )
  }
}

const styles = StyleSheet.create({
preview: {
 flex: 1,
 justifyContent: 'flex-end',
 alignItems: 'center',
 height: Dimensions.get('window').height-80,
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
  marginBottom: Dimensions.get('window').height/2

}
})

export default RegisterProfilePicture;
