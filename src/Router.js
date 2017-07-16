import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import I18n from './services/languageService';

// Views
import Home from './views/Home';

// Provinces
import ProvinceList from './views/provinceList';
import ProvinceInfo from './views/provinceInfo';

const RouterComponent = () => {
  return (
    <Router
      navigationBarStyle={styles.navBar}
      titleStyle={styles.navBarTitle}
      barButtonTextStyle={styles.barButtonTextStyle}
      barButtonIconStyle={styles.barButtonIconStyle}
      sceneStyle={{ paddingTop: 54 }}>

      <Scene key="home" component={Home} title="PVApp" initial />

      {/* Provinces */}
      <Scene key="provList" component={ProvinceList} title={I18n.t('titles.provinces')} />
      <Scene key="provInfo" component={ProvinceInfo} />

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
