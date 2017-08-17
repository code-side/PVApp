import React, {Component} from 'react';
import {View, Alert, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import { Text, Content, Item, Input, Button, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { saveComments } from '../actions';
import I18n from '../services/LanguageService';

class CommentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      rating: 0,
      hasReview: false,
      myComment: '',
      validRating: true,
      review: undefined,
      showToast: false
    };
  }

  componentWillMount(){
    this.renderRatings();
    this.checkReview();
  }

  checkReview(){
    if (this.props.reviewsObject !== undefined && this.props.reviewsObject.reviews !== null) {
      for (let review of this.props.reviewsObject.reviews) {
        if (review.id === this.props.user.id) {
          this.renderRatings(review.rating);
          this.setState({hasReview: true, myComment: review.comment, rating: review.rating, review: review});
        }
      }
    }
  }

  renderRatings =(rating) => {
  this.state.stars = [];
  rating = (rating === undefined) ? this.state.rating : rating;
    for (let i = 1; i <= 5; i++) {
      let star = (i <= rating) ? <Icon key={i} style={{paddingRight:5}} name="star" size={25} onPress={()=> this.selectRating(i)} color="#f1c40f"/>
      :   <Icon key={i} style={{paddingRight:5}} name="star-o" size={25} onPress={()=> this.selectRating(i)}/>;
      this.state.stars.push(star);
    }
  }

  saveRating(){
    if (this.state.rating > 0){
    if ( this.state.review !== undefined){
      this.state.review = {...this.state.review, rating: this.state.rating, comment: this.state.myComment };
      for (var reviewIndex in this.props.reviewsObject.reviews){
        if (this.props.reviewsObject.reviews[reviewIndex].id === this.props.user.id){
          this.props.reviewsObject.reviews[reviewIndex] = {...this.props.reviewsObject.reviews[reviewIndex], rating: this.state.review.rating, comment: this.state.review.comment};
          break;
        }
      }
    } else {
      let review = {...{}, id: this.props.user.id, rating: this.state.rating, comment: this.state.myComment, reports:[]};
      if (this.props.reviewsObject.reviews === null){
        this.props.reviewsObject.reviews = [];
      }
      this.props.reviewsObject.reviews.push(review);
      this.setState({review: review, hasReview: true});
    }

    this.saveChange('message');
  } else {
    this.setState({validRating:false});
  }
  }

  deleteReview(){
    var indexToDelete = -1000;
    for (var reviewIndex in this.props.reviewsObject.reviews){
      if (this.props.reviewsObject.reviews[reviewIndex].id === this.props.user.id){
        indexToDelete = reviewIndex;
        break;
      }
    }
    this.props.reviewsObject.reviews.splice(indexToDelete,1);
    this.renderRatings(0);
    this.setState({myComment: '', rating: 0, stars: this.state.stars, hasReview: false, review: undefined});
    this.saveChange();
  }

  confirmDelete(){
    Alert.alert(
      'Borrar comentario',
      'Esta seguro de borrar el comentario?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.deleteReview()},
      ],
      { cancelable: false }
    );
  }

  saveChange(message){
    const {token = this.props.token, body = this.props.reviewsObject, url = this.props.url} = {};
    this.props.saveComments({token, body, url}).then((response) =>{
      this.setState({validRating: true});
    });
    if (message !== undefined){
      ToastAndroid.showWithGravity('Comentario guardado', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
  }

  selectRating(i){
    this.renderRatings(i);
    this.setState({stars: this.state.stars, rating: i});
  }

  render() {
    return (
      <View style={{paddingTop:10}}>
        <Text>{I18n.t('comment.myComment')}</Text>
        <View style={{flexDirection: 'row'}}>
        {this.state.stars}
        <Right style={{paddingRight:20}}>
          {this.state.hasReview ? <Icon name="trash-o" onPress={()=>this.confirmDelete()} size={25} color="#c0392b" /> : null}
        </Right>
        </View>
        <Content style={{paddingTop:10, paddingBottom:10}}>
         <Item regular>
          <Input placeholder="Escribe un comentario"
          multiline= {true}
          style={{ height:70}}
          onChangeText={(myComment) => this.setState({myComment : myComment})}
          value={this.state.myComment} />
         </Item>
         {!this.state.validRating ? <Text style={{color:'red'}}>Seleccione una calificación</Text> : null}
         <Button style={{paddingTop:10}} onPress={()=> this.saveRating()} full light>
            <Text>{I18n.t('comment.submit')}</Text>
          </Button>
       </Content>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.db.user,
    token: state.db.token
  };
};

export default connect(mapStateToProps, {saveComments})(CommentComponent);
