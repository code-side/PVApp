import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import I18n from '../services/LanguageService';
import HorizontalList from '../components/HorizontalList';
import HorizontalListItem from '../components/HorizontalListItem';
import SearchBar from '../components/SearchBar';
import Menu from '../components/Menu';
import { sortByRating, searchByNameAndProvince } from '../services/SearchService';
import TouristDestinationSurvey from './TouristDestinationSurvey';
import { Container, Text, Separator, Content, List, ListItem } from 'native-base';
import CustomFab from '../components/CustomFab';

class TouristDestinationList extends Component {

  constructor(props) {
    super(props);

    this.hideSurveyModal = this.hideSurveyModal.bind(this);
    this.onCloseFiltersModal = this.onCloseFiltersModal.bind(this);
    this.appliedTags = [];
    this.state = {
      showAttributesModalPicker: false,
      searchText: '',
      exclusiveSearch: true // <- Applies AND or OR condition to appliedTags
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

  onCloseFiltersModal(selectedTags) {
    this.appliedTags = selectedTags || [];
    this.setState({exclusiveSearch: true});
  }

  hideSurveyModal() {
    if (this.surveyModal === undefined) {
      return;
    }

    this.appliedTags = [];
    this.state.exclusiveSearch = false;

    this.surveyModal.getTags().forEach(tagName => {
      let tag = {name: tagName};
      this.appliedTags.push(tag);
    });

    this.setState({...this.state, searchText: ''});
  }

  render() {
    return (
      <Container>
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
            searchFieldIcon="filter"
            searchFieldAction={() => Actions.touristDestinationFilter({onClose: this.onCloseFiltersModal, selectedTags: this.appliedTags})}/>

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
          <CustomFab
            mainIcon="ios-book-outline"
            useIonic={true}
            onPress={() => this.surveyModal.showModal()}/>

          <Menu/>
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
