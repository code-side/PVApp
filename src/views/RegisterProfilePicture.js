import React, { Component } from 'react';
import { StyleSheet, Dimensions, Modal, View, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Container, Content, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


class RegisterProfilePicture extends Component {



  constructor(props){
    super(props);
    this.state  = {
      confirmation: true
    };
    // cloudinary.config({
    //   cloud_name: 'codesidedevs',
    //   api_key: '748436656856871',
    //   api_secret: 'mvN_DfjWnvWgA7ZCaQyUdn4-p4Y'
    // });
  }

  takePicture() {
  //   cloudinary.uploader.upload('http://www.example.com/image.jpg', function(result) {
  //     console.log(result);
  // });
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
          <Button transparent info>
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
 height: Dimensions.get('window').height-78,
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
