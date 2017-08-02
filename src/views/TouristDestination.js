import React, { Component } from 'react';
import { Image, Linking} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Row, Grid } from 'react-native-easy-grid';
import { Container, Text, Content, Button, Tabs, Tab, List, Left, Body, Card, CardItem, Fab, Icon } from 'native-base';


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
      <Card style={{flex: 0}}>
      <CardItem style={{ flexDirection: 'row'}}>
        <Text>{ destination.name }</Text>
      </CardItem>
      </Card>
    );
  }

  invoke(type, resource) {
    if (Linking.canOpenURL(type + ':' + resource.location)) {
      Linking.openURL(type + ':' + resource.location);
    }
  }

  takePhoto(){
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      this.props.touristDest.photos.push( `data:${image.mime};base64,` + image.data );
    });
  }

  renderPhotos(item) {
    return (
      <Card style={{flex: 0}}>
      <CardItem style={{ flexDirection: 'row'}}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: item.url}}
        />
      </CardItem>
      </Card>
    );
  }

  noItems(text) {
    return (<Text style={styles.noItems}>{text}</Text>);
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style={ styles.header }>
              <Image
                style={{ flex: 1 }}
                source={{ uri: this.props.touristDest.photos[0].url }}
              />
            </Row>
          </Grid>
          <Tabs initialPage={0} style={{flex:1}}>
            <Tab heading="Información">

                {/* Info */}
                <Card>
                  <CardItem>
                    <Left>
                    <Text style={styles.titles}>Provincia:</Text>
                    <Text style={styles.textContainer}>{this.props.touristDest.province.name}</Text>
                    </Left>
                  </CardItem>

                <CardItem>
                <Body>
                  <Text style={styles.titles}>Descripción:</Text>
                  <Text style={styles.textContainer}>{this.props.touristDest.description}</Text>
                </Body>
                 </CardItem>

                 <CardItem>
                  <Body>
                  <Text style={styles.titles}>Servicios:</Text>
                  </Body>
                </CardItem>

               <CardItem>
                <List
                   dataArray={ this.props.touristDest.attributes }
                   renderRow={ (item) => this.renderTDestItem(item) }
                />
               </CardItem>

               <CardItem>
               <Body>
                 <Text style={styles.titles}>Ubicación:</Text>
                </Body>

                </CardItem>
                <Button transparent>
                {this.state.isAddToVisit ? <Text style={{color:'red'}}>Remover de lista por visitar</Text> : <Text>Añadir a lista por visitar</Text>}
                </Button>
              </Card>
            </Tab>

            <Tab heading="Fotos">
              <List
                 dataArray={ this.props.touristDest.photos }
                 renderRow={ (item) => this.renderPhotos(item) }
              />
            </Tab>
            <Tab heading="Comentarios" />
          </Tabs>
        </Content>

        <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="md-more" />
            <Button
              onPress={() => this.takePhoto()}
              style={{ backgroundColor: '#34A34F' }}
            >
              <Icon name="ios-pin-outline" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="ios-flag-outline" />
            </Button>
            <Button style={{ backgroundColor: '#DD5144' }}>
              <Icon name="ios-heart-outline" />
            </Button>
          </Fab>

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
    width:16,
    height:16
  },
  icons: {
    width:32,
    height: 32,
    marginRight:5
  }
};

export default TouristDestination;
