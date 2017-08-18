import React, { Component } from 'react';
import { TouchableOpacity, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Menu from '../components/Menu';
import { Container, Text, Body, Content, Card, CardItem, Left } from 'native-base';
import { getTouristDestination } from '../actions';


class FavoriteDestinationList extends Component {

  constructor(props) {
    super(props);
  }
  changeView(destinationID){
    const { token = this.props.token, id = destinationID} = {};
    this.props.getTouristDestination({token,id}).then((response)=>{
      Actions.touristDestination({title: response.name, touristDest: response });
    });
  }

  renderFavoriteList(){
  return this.props.user.favoriteList.map((item, indx) => {
    return (
    <TouchableOpacity key={indx} onPress={()=> this.changeView(item.id)}>
      <Card>
        <CardItem cardBody>
         <Image source={{uri: item.photos[0].url}} style={{ flex: 1, height: 150, margin: 5 }}/>
       </CardItem>
       <CardItem>
         <Left>
           <Body>
             <Text>{item.name}</Text>
           </Body>
         </Left>
       </CardItem>
      </Card>
    </TouchableOpacity>
       );
     });
  }



  render() {
    return (
      <Container>
        <Content>
          {this.renderFavoriteList()}
        </Content>
        <Menu/>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.db.user,
    token: state.db.token
  };
};

export default connect(mapStateToProps, { getTouristDestination })(FavoriteDestinationList);
