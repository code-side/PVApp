import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from './views/Home';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 55 }}>
      <Scene key="home" component={Home} title="PVApp" initial />
    </Router>
  );
};

export default RouterComponent;
