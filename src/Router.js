import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from './views/Home';
import TicoStopList from './views/TicoStopList';
import TicoStop from './views/TicoStop';
import TouristicInterestList from './views/TouristicInterestList';
import TouristicInterest from './views/TouristicInterest';

const RouterComponent = () => {
  return (
    <Router
      navigationBarStyle={styles.navBar}
      titleStyle={styles.navBarTitle}
      barButtonTextStyle={styles.barButtonTextStyle}
      barButtonIconStyle={styles.barButtonIconStyle}
      sceneStyle={{ paddingTop: 54 }}
    >
      <Scene key="home" component={Home} title="PVApp" initial />
      <Scene key="ticoStopList" component={TicoStopList} title="Tico Stops" />
      <Scene key="ticoStop" component={TicoStop} />
      <Scene key="touristicInterestList" component={TouristicInterestList} title="Tico Stops" />
      <Scene key="touristicInterest" component={TouristicInterest} />
    </Router>
  );
};

const styles = {
  navBar: {
    backgroundColor:'#5069c3'
  },
  navBarTitle:{
    color:'#FFFFFF',
    fontWeight: 'bold'
  },
  barButtonTextStyle:{
    color:'#FFFFFF'
  },
  barButtonIconStyle:{
    tintColor:'rgb(255,255,255)'
  }
};

export default RouterComponent;
