import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Text, Content, Tabs, Tab, Card, List, Thumbnail, CardItem, Body, Left, Right } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
// import Moment from 'moment';

import  CommentComponent  from '../components/Comment.component';
import  CommentsComponent  from '../components/Comments.component';


export default class TouristicInterest extends Component {

  invoke(type, resource) {
    if (Linking.canOpenURL(type + ':' + resource.coordinates)) {
      Linking.openURL(type + ':' + resource.coordinates);
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
                source={{ uri: this.props.touristicInterest.photo }}
              />
            </Row>
          </Grid>

          {/* Layout */}
          <Tabs initialPage={0} style={{flex:1}}>
            <Tab heading="Información">
              <Grid>
            {/* Info */}
                <Row>
                  <Text style={styles.titles}>Horario de atención:</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.props.touristicInterest.workingHours}</Text>
                </Row>

                <Row>
                  <Text style={styles.titles}>Contacto:</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.props.touristicInterest.contact}</Text>
                </Row>

                <Row>
                  <Text style={styles.titles}>Ubicación:</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.props.touristicInterest.address}</Text>
                </Row>
                <Row>
                  <Text style={styles.textContainer}>{this.props.touristicInterest.province.canton + ', ' + this.props.touristicInterest.province.name}</Text>
                </Row>
              </Grid>
            </Tab>

            <Tab heading="Comentarios">
              <CommentComponent reviewsObject={this.props.touristicInterest} />
              <CommentsComponent />
            </Tab>
          </Tabs>
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
  },
  listButton: {
    width: 16,
    height: 16
  }
};
