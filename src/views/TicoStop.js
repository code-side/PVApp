import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Text, Content, Icon, Button } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import Menu from '../components/Menu';
import CustomFab from '../components/CustomFab';

export default class TicoStop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  invoke(type, resource, name) {
    const uriString = 'http://maps.google.com/maps?q=' + resource + '(' + name + ')&z=20';
    if (Linking.canOpenURL(type + ':' + uriString)) {
      Linking.openURL(type + ':' + uriString);
    }
  }

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
              <Text style={styles.textContainer}>{this.props.ticoStop.historicalReview}</Text>
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
        <CustomFab>
          <Button
            onPress={() => this.invoke('geo', this.props.ticoStop.coordinates, this.props.ticoStop.name)}
            style={{ backgroundColor: '#34A34F' }}>
            <Icon name="ios-pin-outline" />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }}>
            <Icon name="ios-flag-outline" />
          </Button>
          <Button style={{ backgroundColor: '#DD5144' }}>
            <Icon name="ios-heart-outline" />
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
  }
};
