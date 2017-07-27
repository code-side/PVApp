import React, { Component } from 'react';
import { TouchableOpacity, Animated, View, ScrollView, FlatList, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import I18n from '../services/languageService';
import MapView from 'react-native-maps';
import { Container, Tabs, Tab, Text, Content, Header, Title, Input, Icon, List, ListItem, Grid, Row, Body, Button, Item, DeckSwiper, Card, CardItem, Left, Thumbnail } from 'native-base';

class TouristDestinationList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAdvancedSearchBar: false,
      tags: [],
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    };
  }

  componentWillMount(){
    this.props.attributes.forEach(x => this.props.attributes.push(x));
    this.props.attributes.forEach(x => this.props.attributes.push(x));
    this.props.attributes.forEach(x => this.props.attributes.push(x));

    this.props.touristDestinations.forEach(x => this.props.touristDestinations.push(x));
    this.props.touristDestinations.forEach(x => this.props.touristDestinations.push(x));
    this.props.touristDestinations.forEach(x => this.props.touristDestinations.push(x));
  }

  renderTouristDestinations() {
    return this.props.touristDestinations.map((touristDest, indx) => {
      return (
        <Card key={indx} style={{ width: 160, height: 240 }}>
          <CardItem cardBody>
           <Image style={{ flex: 1, height: 150, margin: 5 }} source={{uri: touristDest.photos[0]}} />
         </CardItem>
         <CardItem>
           <Left>
             <Text style={{textAlign: 'center', flex: 1}}>{touristDest.name}</Text>
           </Left>
         </CardItem>
        </Card>
      );
    });
  }

  changeAdvancedBarVisibility() {
    this.state.showAdvancedSearchBar = !this.state.showAdvancedSearchBar;
    this.setState(this.state);
  }

  getAdvancedSearchBar() {
    return (
      <View style={{flex: 1, height: 175}}>
        <ScrollView style={{flex: 1, height: 175}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
            {this.props.attributes.map((attr, indx) => {
              if (this.state.tags.indexOf(attr) === -1) {
                return <Button style={{margin: 5}} key={indx} rounded small light onPress={() => this.tagToSearch(attr)}>
                  <Text>{attr.name}</Text>
                </Button>;
              } else {
                return <Button style={{margin: 5}} key={indx} rounded small success onPress={() => this.tagToSearch(attr)}>
                  <Text>{attr.name}</Text>
                </Button>;
              }
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  tagToSearch(tag) {
    let indx = this.state.tags.indexOf(tag);

    if (indx !== -1)
    {
      this.state.tags.splice(indx, 1);
    } else {
      this.state.tags.push(tag);
    }

    this.setState(this.state);
  }

  onRegionChange(region) {
    console.log(region);
    this.setState({ region });
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder={I18n.t('general.search')} />
            <TouchableOpacity onPress={() => this.changeAdvancedBarVisibility()}>
              <Icon name={this.state.showAdvancedSearchBar === false ? 'ios-arrow-down' : 'ios-arrow-up'} />
            </TouchableOpacity>
          </Item>
          <Button transparent>
            <Text>{I18n.t('general.search')}</Text>
          </Button>
        </Header>
        <Content>
          {this.state.showAdvancedSearchBar && this.getAdvancedSearchBar()}

          <Tabs initialPage={0} style={{flex:1}}>
            <Tab heading={I18n.t('touristDestionation.tabDestinations')}>
              <Row>
                <FlatList
                  data={this.props.touristDestinations}
                  horizontal={true}
                  renderItem={({touristDest}) => {
                    <Card style={{ width: 160, height: 240 }}>
                      <CardItem cardBody>
                       <Image style={{ flex: 1, height: 150, margin: 5 }} source={{uri: touristDest.photos[0]}} />
                     </CardItem>
                     <CardItem>
                       <Left>
                         <Text style={{textAlign: 'center', flex: 1}}>{touristDest.name}</Text>
                       </Left>
                     </CardItem>
                   </Card>;
                  }}
                />
                {this.renderTouristDestinations()}
              </Row>
            </Tab>


          </Tabs>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    touristDestinations: state.db.staticData.touristDestinations,
    provinces: state.db.staticData.provinces,
    attributes: state.db.staticData.attributes
  };
};

export default connect(mapStateToProps, null)(TouristDestinationList);
