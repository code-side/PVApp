import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { saveToken } from '../actions';
import { connect } from 'react-redux';
import {Container, Content, Footer, FooterTab, Button } from 'native-base';

class Home extends Component {

  componentWillMount() {
    //this.props.welcome('Welcome to PVApp!');
    console.log(this.props);
  }
  render(){
    return (
      <Container>
      <Content>
        <Text>{this.props.token}</Text>
      </Content>
      <Footer>
       <FooterTab>
         <Button full>
           <Text>Footer</Text>
         </Button>
       </FooterTab>
     </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.db.msg,
    token: state.db.token
  };
};

export default connect(mapStateToProps, { saveToken })(Home);
