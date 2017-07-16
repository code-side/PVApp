import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Text, Content } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';

export default class TicoStop extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ticoStop: props.ticoStop || this.getDefault()
    };
  }

  getDefault() {
    var Tico_Stop = {
      _id: 1234,
      name: 'Museo Nacional',
      historical_review: 'Una putada muy vieja que hay en chepe centro.',
      coordinates: '9°55′58″N 84°04′17″O',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Vistamuseocr.jpg',
      address: 'La actual localización del museo es el antiguo Cuartel Bellavista.',
      province:{
        province_id: 1234,
        name:'San José',
        canton: 'San José'
      }
    };
      return Tico_Stop;
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style={ styles.header }>
              <Image
                style={{ flex: 1 }}
                source={{ uri: this.state.ticoStop.photo }}
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
              <Text style={styles.textContainer}>{this.state.ticoStop.historical_review}</Text>
            </Row>

            <Row>
              <Text style={styles.titles}>Dirección:</Text>
            </Row>
            <Row>
              <Text style={styles.textContainer}>{this.state.ticoStop.address}</Text>
            </Row>

            <Row>
              <Text style={styles.titles}>Ubicación:</Text>
            </Row>
            <Row>
              <Text style={styles.textContainer}>{this.state.ticoStop.province.canton + ' , ' + this.state.ticoStop.province.name}</Text>
            </Row>
          </Grid>
        </Content>
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
