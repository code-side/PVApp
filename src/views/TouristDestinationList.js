import React, { Component } from 'react';
import { TouchableOpacity, Animated, View, ScrollView } from 'react-native';
import { Container, Text, Content, Header, Title, Input, Icon, List, ListItem, Row, Body, Button, Item, Card, CardItem, Left, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import I18n from '../services/languageService';

class TouristDestinationList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAdvancedSearchBar: false
    };
  }

  renderTouristDestinations() {
    if (this.props.touristDestinations !== undefined) {
      let cards = this.props.touristDestinations.map((touristDest, indx) => {
        return (
          <TouchableOpacity key={indx} onPress={() => Actions.touristDestionation({touristDest: touristDest})}>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail square source={{uri: touristDest.photos[0]}} />
                  <Text>{touristDest.name}</Text>
                </Left>
              </CardItem>
            </Card>
          </TouchableOpacity>
        );
      });
      return cards;
    }
  }

  changeAdvancedBarVisibility() {
    this.state.showAdvancedSearchBar = !this.state.showAdvancedSearchBar;
    this.setState(this.state);
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <TouchableOpacity onPress={() => this.changeAdvancedBarVisibility()}>
              <Icon name={this.state.showAdvancedSearchBar === false ? 'ios-arrow-down' : 'ios-arrow-up'} />
            </TouchableOpacity>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
          {
            this.state.showAdvancedSearchBar &&
              <View>
                <List>
                  <ListItem itemDivider>
                    <Text>Provinces:</Text>
                  </ListItem>
                  <ListItem>
                    {/* List provinces */
                      this.props.provinces.map((province, indx) => {
                        return <Button key={indx} rounded light>
                          <Text>{province.name}</Text>
                        </Button>;
                      })
                    }
                  </ListItem>

                  <ListItem itemDivider>
                    <Text>Extras:</Text>
                  </ListItem>
                </List>
              </View>
          }

          {this.renderTouristDestinations()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    touristDestinations: state.db.staticData.touristDestinations,
    provinces: state.db.staticData.provinces
  };
};

export default connect(mapStateToProps, null)(TouristDestinationList);
