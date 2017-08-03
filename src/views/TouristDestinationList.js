import React, { Component } from 'react';
import { TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import I18n from '../services/languageService';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { Container, Text, CheckBox, Separator, Content, Footer, FooterTab,Header, Title, Input, List, ListItem, Row, Button, Item, Card, CardItem, Left, Right } from 'native-base';

class TouristDestinationList extends Component {

  constructor(props) {
    super(props);

    this.mapDestWithProvinces = {};
    this.appliedTags = [];
    this.state = {
      showAdvancedSearchBar: false,
      showAttributesModalPicker: false,
      searchText: '',
      tempTags: []
    };
  }

  filterDestinations(province) {
    let results = [];
    let searchText = this.state.searchText.toLowerCase().trim();

    for (let dest of this.props.touristDestinations) {
      if (dest.province.name === province.name) {
        // If no search request accept the destionation by default

        if (this.appliedTags.length === 0 && searchText.length === 0) {
          results.push(dest);
        } else {
          // Search by attributes
          let hasAttributes = (dest.attributes.length > 0);
          let i = 0;

          while (hasAttributes && i < this.appliedTags.length) {
            let tag = this.appliedTags[i++];
            let hasTag = (dest.attributes.find((x) => x.name === tag.name) !== undefined);
            hasAttributes = (hasAttributes && hasTag);
          }

          // Search for property text match (if has value)
          let matchText = false;

          if (searchText.length > 0) {
            let keys = searchText.split(' ');
            let hasTextMatch = false;
            i = 0;

            while (!hasTextMatch && i < keys.length) {
              let key = keys[i].trim();
              hasTextMatch = dest.name.toLowerCase().includes(key) ||
                             dest.province.name.toLowerCase().includes(key);
              i++;
            }
            matchText = hasTextMatch;
          }

          // If tag or text conditions are true, add the destination to result list
          if (hasAttributes && ((searchText.length === 0) || (searchText.length > 0 && matchText))) {
            results.push(dest);
          }
        }
      }
    }

    // Sort results by rating from better to worse
    results.sort((arg1, arg2) => {
      let globalRating1 = 0;
      let globalRating2 = 0;

      arg1.reviews.forEach((r) => {globalRating1 += r.rating;});
      arg2.reviews.forEach((r) => {globalRating2 += r.rating;});

      return globalRating1 < globalRating2;
    });

    return results;
  }

  renderProvincesWithDestinations(listIndex, provinceName, destinations) {
    return (
      <ListItem key={listIndex}>
        <View>
          <Separator bordered style={{flex: 1}}>
            <Text style={styles.provinceName}>{provinceName}</Text>
          </Separator>

          <ScrollView horizontal={true}>
            <Row>
              {this.renderTouristDestinations(destinations)}
            </Row>
          </ScrollView>
        </View>
      </ListItem>
    );
  }

  renderTouristDestinations(destinations) {
    let i = 0;
    return destinations.map((touristDest, indx) => {
      if (i++ < 10) {
        return (
          <TouchableOpacity key={indx} style={{ width: 180, height: 240 }} onPress={() => Actions.touristDestionation({title: touristDest.name, touristDest: touristDest})}>
            <Card>
              <CardItem cardBody>
                <Image style={{ flex: 1, height: 150, margin: 5 }} source={{uri: touristDest.photos[0].url}} />
              </CardItem>
              <CardItem>
                <Left>
                  <Text style={{ flex: 1, textAlign: 'center' }}>{touristDest.name}</Text>
                </Left>
              </CardItem>
            </Card>
          </TouchableOpacity>
        );
      } else if (i === 11) {
        return (
          <TouchableOpacity key={indx} style={{ width: 180, height: 240 }} onPress={() => {}}>
            <Image
              source={SEE_BACKGROUND_CARD}
              style={styles.seeMoreBackground}>
              <Card style={{backgroundColor: 'transparent', width: 180, height: 240}}>
                <CardItem>
                  <Left style={{ marginTop: 25 }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{I18n.t('general.seeMore')}</Text>
                  </Left>
                  <Right style={{ marginTop: 25, marginRight: 10 }}>
                    <AwesomeIcon name="arrow-right" backgroundColor="#fff" color="#000" size={20} />
                  </Right>
                </CardItem>
              </Card>
            </Image>
          </TouchableOpacity>
        );
      }
    });
  }

  getAdvancedSearchBar() {
    return (
      <View style={{ flex: 1, paddingBottom: 15, backgroundColor: '#3f51b5' }}>
        <Item rounded style={{marginTop: 15, backgroundColor: '#fff'}}>
          <Input
            style={{height: 45}}
            value={this.state.searchText}
            onChangeText={(text) => this.setState({searchText: text})}
            placeholder={I18n.t('touristDestionation.searchLegend')}/>

          <Button rounded light onPress={() => this.openModal()}>
            <AwesomeIcon name="plus" backgroundColor="#fff" color="#000" size={18} />
            <Text style={{marginLeft: 10}}>{I18n.t('general.filters')}</Text>
          </Button>
        </Item>
      </View>
    );
  }

  renderAttributesModal() {
    const appyTags = () => {
      this.appliedTags = [];
      this.state.tempTags.forEach(x => this.appliedTags.push(x));
      this.closeModal();
    };

    return (
      <Modal
        isVisible={this.state.showAttributesModalPicker}
        onBackButtonPress={() => this.closeModal()}>

       <View style={styles.modalStyle}>
         {/* Modal title */}
         <Header style={styles.modalHeader}>
           <Title style={{marginTop: 12}}>{I18n.t('general.advancedSearch')}</Title>
         </Header>

         {/* Load attribute list */}
         <ScrollView style={{flex: 1}}>
           {
             this.props.attributes.map((attr, indx) => {
               return <ListItem key={indx} style={{marginRight: 20}} onPress={() => this.tagToSearch(attr)}>
                 <Left>
                   <Text>{attr.name}</Text>
                 </Left>
                 <Right>
                   <CheckBox checked={this.state.tempTags.indexOf(attr) !== -1} onPress={() => this.tagToSearch(attr)}/>
                 </Right>
               </ListItem>;
             })
           }
         </ScrollView>

         {/* Button actions */}
         <Footer style={styles.modalFooter}>
           <FooterTab style={{borderBottomLeftRadius: 8}}>
             <Button full onPress={() => this.closeModal()}>
               <Text style={{fontSize: 14}}>{I18n.t('general.cancel')}</Text>
             </Button>
           </FooterTab>
           <FooterTab style={{borderBottomRightRadius: 8}}>
             <Button full onPress={() => appyTags()}>
               <Text style={{fontSize: 14}}>{I18n.t('general.apply')}</Text>
             </Button>
           </FooterTab>
         </Footer>
       </View>
      </Modal>
    );
  }

  openModal() {
    let _tempTags = [];
    this.appliedTags.forEach(x => _tempTags.push(x));
    this.setState({...this.state, tempTags: _tempTags, showAttributesModalPicker: true});
  }

  closeModal() {
    this.setState({...this.state, tempTags: [], showAttributesModalPicker: false});
  }

  tagToSearch(tag) {
    let indx = this.state.tempTags.indexOf(tag);

    if (indx !== -1) {
      this.state.tempTags.splice(indx, 1);
    } else {
      this.state.tempTags.push(tag);
    }

    this.setState(this.state);
  }

  render() {
    return (
      <Container>
        {/* Advanced search modal, Attributes */}
        {this.renderAttributesModal()}

        {/* View main content */}
        <Content>
          {/* "Header" search button */}
          <Button full onPress={() => this.setState({...this.state, showAdvancedSearchBar: !this.state.showAdvancedSearchBar})}>
            <Text style={{marginRight: 10}}>{I18n.t('general.searcher')}</Text>
            <AwesomeIcon name={this.state.showAdvancedSearchBar ? 'chevron-up' : 'chevron-down'} backgroundColor="transparent" color="#fff" size={14} />
          </Button>

          {/* Collapsible search panel */}
          {this.state.showAdvancedSearchBar && this.getAdvancedSearchBar()}

          {/* List of provinces with destinations */}
          <List>
            {
              this.props.provinces.map((prov, indx) => {
                let destinations = this.filterDestinations(prov);
                if (destinations.length > 0) {
                  return this.renderProvincesWithDestinations(indx, prov.name, destinations);
                }
              })
            }
          </List>
        </Content>
      </Container>
    );
  }
}

const SEE_BACKGROUND_CARD = require('../resources/images/seeMoreBackground.jpg');
const styles = {
  modalHeader: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  modalStyle: {
    margin: 20,
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff'
  },
  modalFooter: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  provinceName: {
    position: 'relative',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  seeMoreBackground: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

const mapStateToProps = state => {
  return {
    touristDestinations: state.db.staticData.touristDestinations,
    provinces: state.db.staticData.provinces,
    attributes: state.db.staticData.attributes
  };
};

export default connect(mapStateToProps, null)(TouristDestinationList);
