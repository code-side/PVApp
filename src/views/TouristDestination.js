import React, {Component} from 'react';
import {Image, Share, View, Alert, TouchableOpacity, Dimensions, Modal, WebView} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Row, Grid} from 'react-native-easy-grid';
import { Container, Text, Content, Button, Tabs, Tab, List, Body, Card, CardItem, Icon} from 'native-base';
import {invoke, getDirections,modifyUser, reportD} from '../actions';
import {connect} from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import CustomFab from '../components/CustomFab';
import Menu from '../components/Menu';
import  CommentComponent  from '../components/Comment.component';
import  CommentsComponent  from '../components/Comments.component';

const WIDTH = Dimensions.get('window').width;

class TouristDestination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      visible: false,
      index: 0,
      isAddToVisit: false
    };
  }

  renderTDestItem(destination) {
    return (
      <Card style={{
        flex: 0
      }}>
        <CardItem style={{
          flexDirection: 'row'
        }}>
          <Text>{destination.name}</Text>
        </CardItem>
      </Card>
    );
  }

  takePhoto() {
    ImagePicker.openCamera({width: 300, height: 400, cropping: true, includeBase64: true}).then((image) => {
      this.props.touristDest.photos.push({
        reports: [],
        state: 'inactivo',
        url: 'data:${image.mime};base64,' + image.data
      });
      invoke(this.props.token, 'tourist-destinations', 'PUT', this.props.touristDest)
        .then(async(response) => {
          this.props.touristDest.photos = response.photos;
        });
    });
  }

  shareDestination() {
    Share.share({
      message: 'BAM: we\'re helping your business with awesome React Native apps',
      url: 'http://bam.tech',
      title: 'Wow, did you see that?'
    }, {dialogTitle: 'Share BAM goodness'});
  }

  favoriteList = () => {
    let isAlreadySaved = false;
    let actionMessage = '';
    for (var i = 0; i < this.props.user.favoriteList.length; i++) {
      if (this.props.touristDest.id === this.props.user.favoriteList[i].id) {
        isAlreadySaved = true;
        this.removeTouristDestFromList(i);
        actionMessage = 'Se removió el destino turistico de la lista de favoritos.';
        break;
      }
    }
    if (!isAlreadySaved) {
      this.props.user.favoriteList.push({id: this.props.touristDest.id, name: this.props.touristDest.name, description: this.props.touristDest.description, photos: this.props.touristDest.photos});
      actionMessage = 'Se agregó el destino turistico a la lista de favoritos.';
    }
    const {
      token = this.props.token,
      user = this.props.user
    } = {};
    this.props.modifyUser({token, user}).then(() => {
      Alert.alert('Lista de favoritos', actionMessage, [], {cancelable: true});
      this.setState({active: false});
    });
  }

  removeTouristDestFromList = (i) => {
    this.props.user.favoriteList.splice(i, 1);
  }


  renderPhotos() {

    return (
      this.props.touristDest.photos.map((image, idx) => {
        return (

          <TouchableOpacity
            style={{
              marginTop: 10,
              height: 150,
              width: WIDTH / 3,
            }}
            key={idx}
            onPress={ () => this.setState({ visible: true, index: idx }) }
          >
            <Card
              style={{
                padding: 5
              }}
            >
              <CardItem cardBody>
                <Image
                  style={{
                    flex: 1,
                    height: 128,
                    width: null,
                  }}
                  source={{ uri: image.url }}
                />
              </CardItem>
            </Card>
          </TouchableOpacity>
      );
    }));
  }

  noItems(text) {
    return (
      <Text style={styles.noItems}>
        {text}
      </Text>
    );
  }

  reportDestination() {
    let reportBody = {idUser: this.props.user.id, idDestination: this.props.touristDest.id };
    const {token = this.props.token, body = reportBody} = {};
    this.props.reportD({token, body}).then(()=>{
    });
    this.setState({ active: false});
  }

  openReportConfirmation(){
    Alert.alert(
      'Reportar destino turistico',
      'El reporte del destino turistico será revisado por nuestros administradores, ' +
      'por favor tomar la seriedad del caso ya que si el reporte es falto puede traer consecuencias a su cuenta.',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Reportar', onPress: () => this.reportDestination()},
      ],
      { cancelable: true }
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style={ styles.header } onPress={ () => this.setState({ visible: true, index: 0 }) }>
              <Image
                style={{ flex: 1 }}
                source={{ uri: this.props.touristDest.photos[0].url }}
              />
            </Row>
          </Grid>
          <Tabs initialPage={0} style={{
            flex: 1
          }}>
            <Tab heading="Información" tabStyle={{backgroundColor: '#3498db'}} activeTabStyle={{backgroundColor: '#2980b9'}}>
             {/* Info */}
             <Card>
               <WebView
                source={{html:
                "<p style='text-align: justify; display:block;'>" +
                this.props.touristDest.description +
                '</p>' }}
                style={{marginTop: 20, height:150}}
                />
               <CardItem>
                 <Body>
                   <Text style={styles.titles}>
                     Servicios:
                   </Text>
                 </Body>
               </CardItem>
               <CardItem>
                 <List dataArray={this.props.touristDest.attributes} renderRow={(item) => this.renderTDestItem(item)}/>
               </CardItem>
             </Card>
           </Tab>
           <Tab heading="Fotos" tabStyle={{backgroundColor: '#3498db'}} activeTabStyle={{backgroundColor: '#2980b9'}}>
             <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {this.renderPhotos()}
            </View>

             </Tab>
            <Tab heading="Comentarios" tabStyle={{backgroundColor: '#3498db'}} activeTabStyle={{backgroundColor: '#2980b9'}}>
              <CommentComponent reviewsObject={this.props.touristDest} url="tourist-destinations"/>
              <CommentsComponent reviews={this.props.touristDest.reviews}/>
            </Tab>
          </Tabs>
        </Content>

        <Modal
          visible={this.state.visible}
          transparent={true}
          onRequestClose={() => this.setState({visible: false})}
        >
          <ImageViewer
            imageUrls={this.props.touristDest.photos}
            index={this.state.index}
            saveToLocalByLongPress={false}
          />
        </Modal>

        <CustomFab>
          <Button onPress={() => this.takePhoto()} style={{
            backgroundColor: '#34A34F'
          }}>
            <Icon name="md-camera"/>
          </Button>
          <Button onPress={() => this.shareDestination()} style={{
            backgroundColor: '#3B5998'
          }}>
            <Icon name="md-share"/>
          </Button>
          <Button
             onPress={ () => this.openReportConfirmation() }
             style={{ backgroundColor: '#c0392b' }}
           >
             <Icon name="md-flag"/>
           </Button>
          <Button onPress={() => this.favoriteList()} style={{
            backgroundColor: '#DD5144'
          }}>
            <Icon name="md-heart"/>
          </Button>
        </CustomFab>

        <Menu/>
        </Container>
    );
  }
}
const styles = {
  header: {
    flex: 1,
    height: 200
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color: 'white',
    flex: 1
  },
  titles: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  textContainer: {
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'justify',
    flexWrap: 'wrap'
  },
  listItem: {
    padding: 10,
    marginLeft: 10
  },
  noItems: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  buttonMargin: {
    width: 140,
    marginLeft: 10,
    marginRight: 10
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1
  },
  listButton: {
    width: 16,
    height: 16
  },
  icons: {
    width: 32,
    height: 32,
    marginRight: 5
  }
};

const mapStateToProps = state => {
  return {token: state.db.token, user: state.db.user};
};

export default connect(mapStateToProps, {getDirections, modifyUser, reportD})(TouristDestination);
