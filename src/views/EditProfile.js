import React, {Component} from 'react';
import { Thumbnail, Text, Container, Content, Form, Card, CardItem, Left, Right, Body} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';


class EditProfile extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.user);
  }

  cancelEdit =()=>{
    Actions.pop();
  }

render() {
    return (
    <Container>
      <Content  style={{flex:1}}>
        <Form  style={{flex:1}}>
        <Card>
          <CardItem>
            <Left>
              <Icon name= 'times' onPress={()=> this.cancelEdit()}/>
            </Left>
            <Right>
            <Text>Done</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Left>
              <Text style={styles.userName}>{this.props.user.name}</Text>
            </Left>
             <Thumbnail large source={{uri: this.props.user.photo.url}} />
          </CardItem>

          <CardItem>
            <Body>
            <Text style={styles.titles}>Género:</Text>
            <Text style={styles.text}>{this.props.user.gender}</Text>
            </Body>
          </CardItem>

          <CardItem>
            <Body>
            <Text style={styles.titles}>Nacionalidad:</Text>
            <Text style={styles.text}>{this.props.user.nationality}</Text>
             </Body>
          </CardItem>

          <CardItem>
            <Body>
            <Text style={styles.titles}>Email:</Text>
             <Text style={styles.text}>{this.props.user.email}</Text>
            </Body>
          </CardItem>

          <CardItem>
            <Body>
            <Text style={styles.titles}>Fecha de nacimiento:</Text>
             <Text style={styles.text}>{this.props.user.birthday}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
            <Text style={styles.titles}>Fecha de registro:</Text>
             <Text style={styles.text}>{this.props.user.registrationDate}</Text>
            </Body>
          </CardItem>
        </Card>
       </Form>
   </Content>
</Container>
    );
  }
}

const styles = {
  titles: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  text: {
    marginLeft: 10,
    fontSize: 16
  },
  userName:{
    fontSize:25,
    fontWeight: 'bold'
  }
};

const mapStateToProps = state => {
  return {user: state.db.user};
};

export default connect(mapStateToProps, null)(EditProfile);
