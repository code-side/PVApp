import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Login from './views/Login'
import Home from './views/Home';
import Register from './views/Register';
import RegisterProfilePicture from './views/RegisterProfilePicture';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 55 }}>
     <Scene key="login" component={Login} initial />
     <Scene key="register" component={Register} title="Registro" />
     <Scene key= "registerProfilePicture" component ={ RegisterProfilePicture } title="Registro" />
     <Scene key="home" component={Home} title="PVApp"/>
    </Router>
  );
};

export default RouterComponent;
