import React, { Component } from 'react';
import { TouchableOpacity, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Menu from '../components/Menu';
import { Container, Text, Body, Content, Card, CardItem, Left } from 'native-base';


class FavoriteDestinationList extends Component {

  constructor(props) {
    super(props);
  }

  renderFavoriteList(){
  return this.props.user.favoriteList.map((item, indx) => {
    return (
    <TouchableOpacity key={indx} onPress={()=> Actions.touristDestination({title: item.name, touristDest: item})}>
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
  return {user: state.db.user};
};

export default connect(mapStateToProps, null)(FavoriteDestinationList);
