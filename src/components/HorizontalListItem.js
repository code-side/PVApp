import React, { Component } from 'react';
import { Image } from 'react-native';
import { Text, Card, CardItem, Body, Left } from 'native-base';

class HorizontalListItem extends Component {

  /**
    Component params:
    REQUIRED
    item: {}
    renderItemImage: (item) => {} expected return 'string'
    renderItemText: (item) => {} expected return 'string'
    renderItemNote: (item) => {} expected return 'string'
  */

   renderItemImage (item) {

    if (this.props.renderItemImage !== undefined) {
      const uri =  this.props.renderItemImage(item);
      if (uri) {
        return {uri: uri};
      }
    }
    return NO_IMAGE;
  }

  renderItemText(item) {
    if (this.props.renderItemText !== undefined) {
      let text = this.props.renderItemText(item);
      return <Text>{text}</Text>;
    }
  }

  renderItemNote(item) {
    if (this.props.renderItemNote !== undefined) {
      let text = this.props.renderItemNote(item);
      return <Text note>{text}</Text>;
    }
  }

  render() {
    return (
      <Card>
        <CardItem cardBody>
          <Image style={{flex:1,height: 100, width: 100,margin: 5 }} source={this.renderItemImage(this.props.item)} />
        </CardItem>
        <CardItem>
          <Left>
            <Body>
              {this.renderItemText(this.props.item)}
              {this.renderItemNote(this.props.item)}
            </Body>
          </Left>
        </CardItem>
      </Card>
    );
  }
}

const NO_IMAGE = require('../resources/images/no_image2.png');
export default HorizontalListItem;
