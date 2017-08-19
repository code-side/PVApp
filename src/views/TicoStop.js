import React, { Component } from 'react';
import { Image, Modal, Dimensions, StyleSheet, WebView} from 'react-native';
import { Container, Text, Content, Icon, Button } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import Menu from '../components/Menu';
import CustomFab from '../components/CustomFab';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class TicoStop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      visible: false,
      initialPosition: {
        latitude: this.props.ticoStop.coordinates.latitude,
        longitude: this.props.ticoStop.coordinates.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
    };
  }

  // invoke(type, resource, name) {
  //   const uriString = 'http://maps.google.com/maps?q=' + resource + '(' + name + ')&z=20';
  //   if (Linking.canOpenURL(type + ':' + uriString)) {
  //     Linking.openURL(type + ':' + uriString);
  //   }
  // }



  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style={ styles.header }>
              <Image
                style={{ flex: 1 }}
                source={{ uri: this.props.ticoStop.photo }}
              />
            </Row>
          </Grid>

          {/* Layout */}
          <Grid>
            {/* Info */}
            <Row>
              <Text style={styles.titles}>Reseña histórica:</Text>
            </Row>
            <Row>
            <WebView
             source={{html:
             "<p style='text-align: justify; display:block;'>" +
             this.props.ticoStop.historicalReview +
             '</p>' }}
             style={{marginTop: 20, height:250}}
             />
            </Row>

            <Row>
              <Text style={styles.titles}>Dirección:</Text>
            </Row>
            <Row>
              <Text style={styles.textContainer}>{this.props.ticoStop.address}</Text>
            </Row>

            <Row>
              <Text style={styles.titles}>Ubicación:</Text>
            </Row>
            <Row>
              <Text style={styles.textContainer}>{this.props.ticoStop.province.canton + ' , ' + this.props.ticoStop.province.name}</Text>
            </Row>
          </Grid>
        </Content>
        <Modal
          visible={this.state.visible}
          transparent={true}
          onRequestClose={() => this.setState({visible: false})}
        >
          <MapView
            style={styles.map}
            region={this.state.initialPosition}
          >
            <MapView.Marker
              coordinate={this.state.initialPosition}
            />
          </MapView>
        </Modal>
        <CustomFab>
          <Button
            onPress={ () => this.setState({ visible: true }) }
            style={{ backgroundColor: '#34A34F' }}>
            <Icon name="ios-pin" />
          </Button>
        </CustomFab>

        <Menu/>
      </Container>
    );
  }
}

const styles = {
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
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
  }
};
