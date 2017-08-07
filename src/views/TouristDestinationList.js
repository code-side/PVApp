import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import I18n from '../services/languageService';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import HorizontalList from './HorizontalList';
import HorizontalListItem from './HorizontalListItem';
import SearchBar from './SearchBar';
import { sortByRating, searchByNameAndProvince } from '../services/SearchService';
import TouristDestinationSurvey from './TouristDestinationSurvey';
import { Container, Text, CheckBox, Separator, Content, Fab, Footer, FooterTab, Header, Title, List, ListItem, Button, Left, Right } from 'native-base';

class TouristDestinationList extends Component {

  constructor(props) {
    super(props);

    this.hideSurveyModal = this.hideSurveyModal.bind(this);
    this.appliedTags = [];
    this.state = {
      showAttributesModalPicker: false,
      searchText: '',
      exclusiveSearch: true, // <- Applies AND or OR condition to appliedTags
      tempTags: []
    };
  }

  filter(province) {
    let results = [];

    // Filter results by destination name and province name
    let destinations = searchByNameAndProvince(this.props.touristDestinations, this.state.searchText, province.name);

    if (this.appliedTags.length === 0) {
      results = destinations;
    } else {
      for (let dest of destinations) {
        let hasAttributes = (dest.attributes.length > 0);

        if (hasAttributes) {
          let i = 0;

          // Filter exclusively or inclusively by attributes
          while (hasAttributes && i < this.appliedTags.length) {
            let tag = this.appliedTags[i++];
            let containsAttr = (dest.attributes.find((x) => x.name === tag.name) !== undefined);
            hasAttributes = (this.state.exclusiveSearch ? (containsAttr && hasAttributes) : (containsAttr || hasAttributes));
          }
        }

        if (hasAttributes) {
          results.push(dest);
        }
      }
    }

    // Sort results by rating from better to worse
    results = sortByRating(results);
    return results;
  }

  renderProvincesWithDestinations(listIndex, provinceName, destinations) {
    return (
      <ListItem key={listIndex} style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Separator bordered style={{flex: 1}}>
            <Text style={styles.provinceName}>{provinceName}</Text>
          </Separator>

          <HorizontalList
            items={destinations}
            onItemPressed={(item) => Actions.touristDestination({title: item.name, touristDest: item})}
            viewMoreParams={(items) => this.getViewMoreParams(items)}
            renderItem={(item) => this.renderDestination(item)}
          />
        </View>
      </ListItem>
    );
  }

  getViewMoreParams(items) {
    return {
      title: I18n.t('titles.touristictDestinations'),
      items: items,
      onItemPressed: (_item) => Actions.touristDestination({title: _item.name, touristDest: _item}),
      itemImage: (_item) => _item.photos[0].url,
      itemLegend: (_item) => _item.province.name
    };
  }

  renderDestination(destination) {
    return (
      <HorizontalListItem
        item={destination}
        renderItemImage={(item) => item.photos[0].url}
        renderItemText={(item) => item.name}/>
    );
  }

  renderAttributesModal() {
    const appyTags = () => {
      this.appliedTags = [];
      this.state.exclusiveSearch = true;
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
         <ListItem itemDivider onPress={() => this.setState({tempTags: []})}>
           <Left>
             <Text>{I18n.t('general.clear')}</Text>
           </Left>
           <Right style={{marginRight: 20}}>
             <AwesomeIcon name="trash-o"/>
           </Right>
         </ListItem>
         <ScrollView style={{flex: 1}}>
           {
             this.props.attributes.map((attr, indx) => {
               return <ListItem key={indx} style={{marginRight: 20}} onPress={() => this.tagToSearch(attr)}>
                 <Left>
                   <Text>{attr.name}</Text>
                 </Left>
                 <Right>
                   <CheckBox
                     checked={this.state.tempTags.find((x) => x.name === attr.name) !== undefined}
                     onPress={() => this.tagToSearch(attr)}/>
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
    let indx = this.state.tempTags.findIndex((x) => x.name === tag.name);

    if (indx !== -1) {
      this.state.tempTags.splice(indx, 1);
    } else {
      this.state.tempTags.push(tag);
    }

    this.setState(this.state);
  }

  hideSurveyModal() {
    this.appliedTags = [];
    this.state.tempTags = [];
    this.state.exclusiveSearch = false;

    this.surveyModal.getTags().forEach(tagName => {
      let tag = {name: tagName};
      this.appliedTags.push(tag);
      this.state.tempTags.push(tag);
    });

    this.setState({...this.state, searchText: ''});
  }

  render() {
    return (
      <Container>
        {/* Advanced search modal, Attributes */}
        {this.renderAttributesModal()}

        {/* Surveys */}
        <TouristDestinationSurvey
          modalRef={(ref) => {this.surveyModal = ref;}}
          onModalClose={this.hideSurveyModal}/>

        {/* View main content */}
        <Content>
          {/* Collapsible search panel */}
          <SearchBar
            placeholder={I18n.t('touristDestination.searchLegend')}
            onChangeText={(text) => this.setState({searchText: text})}
            searchFieldIcon="plus"
            searchFieldText={I18n.t('general.filters')}
            searchFieldAction={() => this.openModal()}/>

          {/* List of provinces with destinations */}
          <List>
            {
              this.props.provinces.map((prov, indx) => {
                let destinations = this.filter(prov);
                if (destinations.length > 0) {
                  return this.renderProvincesWithDestinations(indx, prov.name, destinations);
                }
              })
            }
          </List>
        </Content>

        {/* Survey modal trigger */}
        <Fab
          position="bottomRight"
          onPress={() => this.surveyModal.showModal()}>
          <AwesomeIcon name="filter"/>
        </Fab>
      </Container>
    );
  }
}

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
