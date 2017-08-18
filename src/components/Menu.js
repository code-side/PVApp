import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from '../services/LanguageService';

class Menu extends Component {

  render() {
    return (
      <Footer style={styles.menuOption}>
        <FooterTab style={styles.menuOption}>
          <Button full onPress={() => Actions.home()}>
            <Icon name="home" size={ICON_SIZE} color={ICON_COLOR}/>
            <Text style={styles.menuTextOption}>{I18n.t('home.home')}</Text>
          </Button>
        </FooterTab>
        <FooterTab style={styles.menuOption}>
          <Button full>
            <Icon name="heart-o" size={ICON_SIZE} color={ICON_COLOR}/>
            <Text style={styles.menuTextOption}>{I18n.t('home.favorites')}</Text>
          </Button>
        </FooterTab>
        <FooterTab style={styles.menuOption}>
          <Button full onPress={() => Actions.showMap({title: 'Nearby'})}>
            <Icon name="map-marker" size={ICON_SIZE} color={ICON_COLOR}/>
            <Text style={styles.menuTextOption}>{I18n.t('home.map')}</Text>
          </Button>
        </FooterTab>
        <FooterTab style={styles.menuOption}>
          <Button full onPress={() => Actions.appSettings()}>
            <Icon name="user-o" size={ICON_SIZE} color={ICON_COLOR}/>
            <Text style={styles.menuTextOption}>{I18n.t('home.profile')}</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const ICON_SIZE = 25;
const ICON_COLOR = '#000';
const styles = {
  menuTextOption: {
    fontSize: 10,
    color: 'black',
    fontWeight:'bold'
  },
  menuOption: {
    backgroundColor: '#f4f4f4'
  }
};

export default Menu;
