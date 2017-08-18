import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import { Text } from 'native-base';
//import I18n from '../services/LanguageService';

class CommentsComponent extends Component {
  constructor(props) {
    super(props);
  }
  renderReviews(reviews) {

  }

  render() {
    return (
      <View>
        <Text>Todos los comentarios</Text>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.db.user};
};

export default connect(mapStateToProps, null)(CommentsComponent);
