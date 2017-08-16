import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import I18n from '../services/LanguageService';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { Container, Text, Button, ListItem, Left, Right, CheckBox, Footer, FooterTab } from 'native-base';

class TouristDestinationFilter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTags: this.props.selectedTags || []
    };
  }

  applyTags() {
    if (this.props.onClose !== undefined) {
      this.props.onClose(this.state.selectedTags);
    }

    Actions.pop();
  }

  tagToSearch(tag) {
    let indx = this.state.selectedTags.findIndex((x) => x.name === tag.name);

    if (indx !== -1) {
      this.state.selectedTags.splice(indx, 1);
    } else {
      this.state.selectedTags.push(tag);
    }

    this.setState({selectedTags: this.state.selectedTags});
  }

  renderAttributes() {
    return  this.props.attributes.map((attr, indx) => {
      return (
        <ListItem key={indx} style={{marginRight: 20}} onPress={async () => await this.tagToSearch(attr)}>
          <Left>
            <Text>{attr.name}</Text>
          </Left>
          <Right>
            <CheckBox
              checked={this.state.selectedTags.find((x) => x.name === attr.name) !== undefined}
              onPress={async () => await this.tagToSearch(attr)}/>
          </Right>
        </ListItem>
      );
    });
  }

  render() {
    return (
      <Container>
        {/* Set first list item */}
        <ListItem itemDivider onPress={() => this.setState({selectedTags: []})}>
          <Left>
            <Text>{I18n.t('general.clear')}</Text>
          </Left>
          <Right style={{marginRight: 20}}>
            <IonicIcon name="md-close" size={24}/>
          </Right>
        </ListItem>

        {/* Load attribute list */}
        <ScrollView>
          { this.renderAttributes() }
        </ScrollView>

        {/* Set modal buttons */}
        <Footer style={{height: 55}}>
          <FooterTab>
            <Button full onPress={() => Actions.pop()}>
              <Text style={{fontSize: 14}}>{I18n.t('general.cancel')}</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button full onPress={() => this.applyTags()}>
              <Text style={{fontSize: 14}}>{I18n.t('general.apply')}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    attributes: state.db.staticData.attributes
  };
};

export default connect(mapStateToProps, null)(TouristDestinationFilter);
