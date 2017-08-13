import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Text, List, ListItem, Separator } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import I18n from '../services/LanguageService';
import HorizontalList from '../components/HorizontalList';
import HorizontalListItem from '../components/HorizontalListItem';
import SearchBar from '../components/SearchBar';
import Menu from '../components/Menu';
import { searchByNameAndProvince } from '../services/SearchService';

class TicoStopList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    };
  }

  filter(province) {
    let results = searchByNameAndProvince(this.props.ticoStopList, this.state.searchText, province.name);
    return results;
  }

  renderProvincesWithTicoStops(listIndex, provinceName, ticoStops) {
    return (
      <ListItem key={listIndex} style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Separator bordered style={{flex: 1}}>
            <Text style={styles.provinceName}>{provinceName}</Text>
          </Separator>

          <HorizontalList
            items={ticoStops}
            onItemPressed={(item) => Actions.ticoStop({ title: item.name, ticoStop: item })}
            viewMoreParams={(items) => this.getViewMoreParams(items)}
            renderItem={(item) => this.renderInterest(item)}
          />
        </View>
      </ListItem>
    );
  }

  getViewMoreParams(items) {
    return {
      title: I18n.t('titles.ticoStops'),
      items: items,
      onItemPressed: (_item) => Actions.ticoStop({ title: _item.name, ticoStop: _item }),
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

          {/* List of provinces with ticoStops */}
          <List>
            {
              this.props.provinces.map((prov, indx) => {
                let ticoStops = this.filter(prov);
                if (ticoStops.length > 0) {
                  return this.renderProvincesWithTicoStops(indx, prov.name, ticoStops);
                }
              })
            }
          </List>
        </Content>

        <Menu/>
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
    ticoStopList: state.db.staticData.ticoStops,
    provinces: state.db.staticData.provinces
  };
};

export default connect(mapStateToProps)(TicoStopList);
