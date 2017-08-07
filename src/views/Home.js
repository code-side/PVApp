import React, {Component} from 'react';
import {
  Footer,
  FooterTab,
  Button,
  Container,
  Content,
  List,
  ListItem,
  Text,
  Right
} from 'native-base';
import I18n from '../services/languageService';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import HorizontalList from './HorizontalList';
import HorizontalListItem from './HorizontalListItem';

class Home extends Component {

  renderSectionHeader(sectionName, action) {
    return (
      <ListItem itemDivider>
        <Text style={styles.sectionHeaderText}>{sectionName}</Text>
        <Right>
          <Text style={styles.sectionHeaderViewMore} onPress={() => action()}>
            {I18n.t('general.viewAll') + '   '}
            <Icon name="angle-right" size={20} color={VIEW_MORE_COLOR}/>
          </Text>
        </Right>
      </ListItem>
    );
  }

  renderItem(item, addCardNote) {
    if (item) {
      return <HorizontalListItem
        item={item}
        renderItemText={(_item) => _item.name}
        renderItemNote={(_item) => (addCardNote ? _item.province.name : '')}
        renderItemImage={(_item) => {
          if (_item.photos !== undefined && _item.photos.length > 0) {
            return _item.photos[0].url;
          } else {
            return _item.photo;
          }
        }}/>;
    } else {
      return <HorizontalListItem renderItemText={(_item) => I18n.t('general.loading') + '...'}/>;
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            {/* Destinations header */}
            {this.renderSectionHeader(I18n.t('titles.touristictDestinations'), Actions.touristDestinations)}

            {/* Destinations list */}
            <HorizontalList
              items={this.props.touristDestinations ? this.props.touristDestinations : [{}]}
              renderItem={(item) => this.renderItem(item, true)}
              showViewMore={false}
              onItemPressed={(item) => {
                if (item) {
                  Actions.touristDestination({title: item.name, touristDest: item});
                }
              }}
            />

            {/* Services header */}
            {this.renderSectionHeader(I18n.t('titles.touristictInterests'), Actions.touristicInterestList)}

            {/* Services list */}
            <HorizontalList
              items={this.props.turisticInterestList ? this.props.turisticInterestList : [{}]}
              renderItem={(item) => this.renderItem(item, true)}
              showViewMore={false}
              onItemPressed={(item) => {
                if (item) {
                  Actions.touristicInterest({title: item.name, touristicInterest: item});
                }
              }}
            />

            {/* TicoStops header */}
            {this.renderSectionHeader(I18n.t('titles.ticoStops'), Actions.ticoStopList)}

            {/* TicoStops list */}
            <HorizontalList
              items={this.props.ticoStopList ? this.props.ticoStopList : [{}]}
              renderItem={(item) => this.renderItem(item, true)}
              showViewMore={false}
              onItemPressed={(item) => {
                if (item) {
                  Actions.ticoStop({title: item.name, ticoStop: item});
                }
              }}
            />

            {/* Provinces header */}
            {this.renderSectionHeader(I18n.t('titles.provinces'), Actions.provList)}

            {/* Provinces list */}
            <HorizontalList
              items={this.props.provinces ? this.props.provinces : [{}]}
              renderItem={(item) => this.renderItem(item)}
              noLimitRestriction={true}
              onItemPressed={(item) => {
                if (item) {
                  Actions.provInfo({title: item.name, province: item});
                }
              }}
            />
          </List>
        </Content>

        <Footer>
          <FooterTab>
            <Button full>
              <Icon name="home" size={25} color="#FFF"/>
              <Text style={{fontSize:10, fontWeight:'bold'}}>{I18n.t('home.home')}</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button full>
              <Icon name="heart-o" size={25} color="#FFF"/>
              <Text style={{fontSize:10, fontWeight:'bold'}}>{I18n.t('home.favorites')}</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button full onPress={() => Actions.showMap({title: 'Nearby'})}>
              <Icon name="map-marker" size={25} color="#FFF"/>
              <Text style={{fontSize:10, fontWeight:'bold'}}>{I18n.t('home.map')}</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button full onPress={() => Actions.appSettings()}>
              <Icon name="user-o" size={25} color="#FFF"/>
              <Text style={{fontSize:10, fontWeight:'bold'}}>{I18n.t('home.profile')}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const VIEW_MORE_COLOR = '#ACACAC';
const styles = {
  sectionHeaderText: {
    fontWeight: 'bold',
    marginLeft: 5
  },
  sectionHeaderViewMore: {
    marginRight: 5,
    color: VIEW_MORE_COLOR,
    width: 100
  }
};

const mapStateToProps = state => {
  return {
    touristDestinations: state.db.staticData.touristDestinations,
    turisticInterestList: state.db.staticData.touristicInterests,
    ticoStopList: state.db.staticData.ticoStops,
    provinces: state.db.staticData.provinces
  };
};

export default connect(mapStateToProps, null)(Home);
