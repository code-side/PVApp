import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu from '../components/Menu';
import { Container, Content, Text, Card, CardItem, Right, Body, Left, List, Thumbnail } from 'native-base';

class ViewMoreList extends Component {

  itemImage(item) {
    if (this.props.itemImage !== undefined) {
      const uri = this.props.itemImage(item);

      if (uri) {
        return {uri: uri};
      }
    }
    return NO_IMAGE;
  }

  itemTitle(item) {
    if (this.props.itemTitle !== undefined) {
      return this.props.itemTitle(item) || '';
    }
    return item.name || '';
  }

  itemLegend(item) {
    if (this.props.itemLegend !== undefined) {
      return <Text style={{fontSize: 12, color: 'lightgray'}}>{this.props.itemLegend(item)}</Text>;
    }
    return;
  }

  renderItem(item) {
    return (
      <TouchableOpacity onPress={() => this.props.onItemPressed(item)}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail square source={this.itemImage(item)} />
              <Body>
                <Text>{this.itemTitle(item)}</Text>
                {this.itemLegend(item)}
              </Body>
            </Left>
            <Right>
              <Icon name="chevron-right" />
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <List
            dataArray={this.props.items}
            renderRow={(item) => this.renderItem(item)}
          />
        </Content>

        <Menu/>
      </Container>
    );
  }
}

const NO_IMAGE = require('../resources/images/no_image.jpg');
export default ViewMoreList;
