import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Text, List, ListItem, Separator } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import I18n from '../services/languageService';
import HorizontalList from './HorizontalList';
import HorizontalListItem from './HorizontalListItem';
import SearchBar from './SearchBar';
import { sortByRating, searchByNameAndProvince } from '../services/SearchService';

class TouristicInterestList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    };
  }

  filter(province) {
    let results = searchByNameAndProvince(this.props.turisticInterestList, this.state.searchText, province.name);

    // Sort results by rating from better to worse
    results = sortByRating(results);
    return results;
  }

  renderProvincesWithInterests(listIndex, provinceName, interests) {
    return (
      <ListItem key={listIndex} style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Separator bordered style={{flex: 1}}>
            <Text style={styles.provinceName}>{provinceName}</Text>
          </Separator>

          <HorizontalList
            items={interests}
            onItemPressed={(item) => Actions.touristicInterest({ title: item.name, touristicInterest: item })}
            viewMoreParams={(items) => this.getViewMoreParams(items)}
            renderItem={(item) => this.renderInterest(item)}
          />
        </View>
      </ListItem>
    );
  }

  getViewMoreParams(items) {
    return {
      title: I18n.t('titles.touristictInterests'),
      items: items,
      onItemPressed: (_item) => Actions.touristicInterest({ title: _item.name, touristicInterest: _item }),
      itemImage: (_item) => _item.photo,
      itemLegend: (_item) => _item.province.name
    };
  }

  renderInterest(interest) {
    return (
      <HorizontalListItem
        item={interest}
        renderItemImage={(item) => item.photo}
        renderItemText={(item) => item.name}/>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          {/* Collapsible search panel */}
          <SearchBar
            placeholder={I18n.t('touristInterest.searchLegend')}
            onChangeText={(text) => this.setState({searchText: text})}/>

          {/* List of provinces with interests */}
          <List>
            {
              this.props.provinces.map((prov, indx) => {
                let interests = this.filter(prov);
                if (interests.length > 0) {
                  return this.renderProvincesWithInterests(indx, prov.name, interests);
                }
              })
            }
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = {
  provinceName: {
    position: 'relative',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
};

const mapStateToProps = state => {
  return {
    turisticInterestList: state.db.staticData.touristicInterests,
    provinces: state.db.staticData.provinces
  };
};

export default connect(mapStateToProps)(TouristicInterestList);
