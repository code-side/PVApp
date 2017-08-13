import React, { Component } from 'react';
import { Container, Text, Content, Radio, Right, List, ListItem, CheckBox } from 'native-base';
import { connect } from 'react-redux';
import { updateConfig, refreshStaticData } from '../actions';
import I18n from '../services/LanguageService';
import { AsyncStorage } from 'react-native';
import {Actions} from 'react-native-router-flux';

class Configuration extends Component {

  updateConfig(config) {
    AsyncStorage.setItem('@app_config:key', JSON.stringify(config));
    this.props.updateConfig(config);
  }

  renderLanguages() {
    return I18n.languages.map((lang, indx) => {
      return (
        <ListItem key={indx} onPress={() => {
          I18n.locale = lang;
          this.props.refreshStaticData(this.props.token);
          this.updateConfig({...this.props.config, lang: lang});
          Actions.refresh({title: I18n.t('titles.settings')});
        }}>
          <Text>{I18n.t('appConfig.langNames.' + lang)}</Text>
          <Right>
            <Radio selected={lang === this.props.config.lang} />
          </Right>
        </ListItem>
      );
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            {/* General config */}
            <ListItem itemDivider>
              <Text>{I18n.t('appConfig.sections.general')}</Text>
            </ListItem>
            <ListItem onPress={() => {
              let enable = !this._notifications.props.checked;
              this.updateConfig({...this.props.config, notifications: enable});
            }}>
              <Text>{I18n.t('appConfig.notifications')}</Text>
              <Right>
                <CheckBox ref={(ref) => {this._notifications = ref;}} checked={this.props.config.notifications} />
              </Right>
            </ListItem>

            {/* Languages */}
            <ListItem itemDivider>
              <Text>{I18n.t('appConfig.sections.languages')}</Text>
            </ListItem>
            {this.renderLanguages()}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    config: state.appConfigReducer.appConfig,
    token: state.db.token
  };
};

export default connect(mapStateToProps, { updateConfig, refreshStaticData })(Configuration);
