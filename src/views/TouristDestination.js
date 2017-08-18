import React, {Component} from 'react';
import {Image, Share, Alert, WebView} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Row, Grid} from 'react-native-easy-grid';
import {
  Container,
  Text,
  Content,
  Button,
  Tabs,
  Tab,
  List,
  Body,
  Card,
  CardItem,
  Icon
} from 'native-base';
import {invoke, getDirections, modifyUser} from '../actions';
import {connect} from 'react-redux';
import CustomFab from '../components/CustomFab';
import Menu from '../components/Menu';
import CommentComponent from '../components/Comment.component';
import CommentsComponent from '../components/Comments.component';

class TouristDestination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddToVisit: false,
      active: false
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
      invoke(this.props.token, 'tourist-destinations', 'PUT', this.props.touristDest);
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

  renderPhotos(item) {
    return (
      <Card style={{
        flex: 0
      }}>
        <CardItem style={{
          flexDirection: 'row'
        }}>
          <Image style={{
            width: 50,
            height: 50
          }} source={{
            uri: item.url
          }}/>
        </CardItem>
      </Card>
    );
  }

  noItems(text) {
    return (
      <Text style={styles.noItems}>
        {text}
      </Text>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style={styles.header}>
              <Image style={{
                flex: 1
              }} source={{
                uri: this.props.touristDest.photos[0].url
              }}/>
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
              <List dataArray={this.props.touristDest.photos} renderRow= {(item) => this.renderPhotos(item)}/>
            </Tab>
            <Tab heading="Comentarios" tabStyle={{backgroundColor: '#3498db'}} activeTabStyle={{backgroundColor: '#2980b9'}}>
              <CommentComponent reviewsObject={this.props.touristDest} url="tourist-destinations"/>
              <CommentsComponent reviews={this.props.touristDest.reviews}/>
            </Tab>
          </Tabs>
        </Content>

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

export default connect(mapStateToProps, {getDirections, modifyUser})(TouristDestination);
