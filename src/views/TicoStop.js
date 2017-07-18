import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Text, Content } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';

export default class TicoStop extends Component {

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
