import React, { Component } from 'react';
import { View } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import I18n from '../services/LanguageService';
import { Text, Item, Input, Button } from 'native-base';

class SearchBar extends Component {

  /**
    This component should be placed as first element in parent's <Content/>

    Component params:
    OPTIONAL
    visible: default false
    placeholder: default I18n.t('general.search')
    onChangeText: (text) => {}
    searchFieldAction: () => {}
    searchFieldIcon: ''
    searchFieldText: ''
  */

  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible || false,
      searchText: ''
    };
  }

  onChangeText(text) {
    if (this.props.onChangeText !== undefined) {
      this.props.onChangeText(text);
    }

    this.setState({searchText: text});
  }

  getSearchBar() {
    return (
      <View style={{ marginLeft: 5, marginBottom: 15, marginRight: 5 }}>
        <Item rounded style={{marginTop: 15, backgroundColor: '#fff'}}>
          <Input
            style={{height: 45}}
            value={this.state.searchText}
            onChangeText={(text) => this.onChangeText(text)}
            placeholder={this.props.placeholder || I18n.t('general.search')}/>

          {
            this.props.searchFieldAction !== undefined ? (
              <Button rounded light onPress={() => this.props.searchFieldAction()}>
                {this.props.searchFieldIcon !== undefined ? (<AwesomeIcon name={this.props.searchFieldIcon} backgroundColor="#fff" color="#000" size={18} />) : (null)}
                {this.props.searchFieldText !== undefined ? (<Text style={{marginLeft: 10}}>{this.props.searchFieldText}</Text>) : (null)}
              </Button>
            ) : (null)
          }
        </Item>
      </View>
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: '#3f51b5' }}>
        {/* "Header" search button */}
        <Button full onPress={() => this.setState({...this.state, visible: !this.state.visible})}>
          <Text style={{marginRight: 10}}>{I18n.t('general.searcher')}</Text>
          <AwesomeIcon name={this.state.visible ? 'chevron-up' : 'chevron-down'} backgroundColor="transparent" color="#fff" size={14} />
        </Button>

        {/* Collapsible search panel */}
        {this.state.visible && this.getSearchBar()}
      </View>
    );
  }
}

export default SearchBar;
