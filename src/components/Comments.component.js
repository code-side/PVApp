import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Content, Text, List, ListItem, Body, Left, Right, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
//import I18n from '../services/LanguageService';

class CommentsComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    this.deleteUserLoggedComment();
  }
  renderReviews() {
    console.log(this.props);
    return this.props.reviews.map((item, indx) => {
      return (
        <ListItem avatar key={indx}>
             <Left>
              <Thumbnail  source={{uri: item.userPhoto}} />
             </Left>
             <Body>
               <Text>{item.userName}</Text>
               <Text>Calificación: {item.rating}<Icon style={{paddingRight:5}} name="star" size={15} color="#f1c40f"/></Text>
               <Text note>{item.comment}</Text>
             </Body>
             <Right>
               <Text note>3:43 pm</Text>
             </Right>
           </ListItem>

         );
       });
  }
  deleteUserLoggedComment(){
  var indexToDelete = -1000;
  for (var reviewIndex in this.props.reviews){
    if (this.props.reviews[reviewIndex].id === this.props.user.id){
      indexToDelete = reviewIndex;
      break;
    }
  }
  if (indexToDelete !== -1000){
    this.props.reviews.splice(indexToDelete,1);
  }
}

  render() {
    return (
      <Container>
        <Content>
        <Text>Todos los comentarios:</Text>
        <List>
        {this.renderReviews()}
        </List>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {user: state.db.user};
};

export default connect(mapStateToProps, null)(CommentsComponent);
