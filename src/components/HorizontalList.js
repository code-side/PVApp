import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import I18n from '../services/LanguageService';
import { Row, Text, Card, CardItem, Right, Left } from 'native-base';

class HorizontalList extends Component {

  /**
    Component params:
    REQUIRED
    items: []
    renderItem: (item) => {} expected return <HorizontalListItem/>
    onItemPressed: (item) => {}

    OPTIONAL
    maxItems: default 10
    noLimitRestriction: default false
    onViewMore: ([optional]{params}) => {} // Override default Actions.viewMore({params})
    viewMoreParams: ([items]) => {} expected return {params}
    showViewMore: default true
  */

  viewMore(items) {
    if (this.props.onViewMore !== undefined) {
      if (this.props.viewMoreParams !== undefined) {
        this.props.onViewMore(this.props.viewMoreParams(items));
      } else {
        this.props.onViewMore();
      }
    } else if (this.props.viewMoreParams !== undefined) {
      Actions.viewMore(this.props.viewMoreParams(items) || {items: this.props.items});
    }
  }

  renderItems() {
    let i = 0;
    let showMore = false;
    return this.props.items.map((item, indx) => {
      if ((i++ < (this.props.maxItems || MAX_ITEMS)) || (this.props.noLimitRestriction || false)) {
        return (
          <TouchableOpacity key={indx} style={{ width: 180, height: 240 }} onPress={() => this.props.onItemPressed(item)}>
            {this.props.renderItem(item)}
          </TouchableOpacity>
        );
      } else if (!showMore && (this.props.showViewMore === undefined || this.props.showViewMore === true)) {
        showMore = true;

        return (
          <TouchableOpacity key={indx} style={{ width: 180, height: 240 }} onPress={() => this.viewMore(this.props.items)}>
            <Image
              source={SEE_BACKGROUND_CARD}
              style={styles.seeMoreBackground}>
              <Card style={{ backgroundColor: 'transparent', width: 180, height: 240 }}>
                <CardItem>
                  <Left style={{ marginTop: 25 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{I18n.t('general.seeMore')}</Text>
                  </Left>
                  <Right style={{ marginTop: 25, marginRight: 10 }}>
                    <AwesomeIcon name="arrow-right" backgroundColor="#fff" color="#000" size={20} />
                  </Right>
                </CardItem>
              </Card>
            </Image>
          </TouchableOpacity>
        );
      }
    });
  }

  render() {
    return (
      <ScrollView horizontal={true}>
        <Row>
          {this.renderItems()}
        </Row>
      </ScrollView>
    );
  }
}

const MAX_ITEMS = 10;
const SEE_BACKGROUND_CARD = require('../resources/images/seeMoreBackground.jpg');
const styles = {
  seeMoreBackground: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  }
};
export default HorizontalList;
