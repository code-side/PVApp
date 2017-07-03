import React, { Component } from 'react';
import { Image, View} from 'react-native';
import { Container, Header, Content, Tab, Tabs, Text } from 'native-base';


class TouristDestination extends Component {

  render() {
    return (
      <Container>
        <View>
          <Image source={{uri: 'https://www.municipay.com/wp-content/themes/Artificial-Reason-WP/img/no_image.png'}} style={{height: 200, width: null, flex: 1}}/>
        </View>
        <Header hasTabs />
        <Tabs initialPage={1}>
          <Tab heading="Informacion"><Text>Información</Text><Tab/>
          </Tab>
          <Tab heading="Fotos"><Text>Fotos</Text><Tab/>
          </Tab>
          <Tab heading="Comentarios"><Text>Comentarios</Text><Tab/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default TouristDestination;
