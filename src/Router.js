import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Login from './views/Login';
import I18n from './services/languageService';
import Home from './views/Home';
import Register from './views/Register';
import RegisterProfilePicture from './views/RegisterProfilePicture';

// Provinces
import ProvinceList from './views/ProvinceList';
import ProvinceInfo from './views/ProvinceInfo';

const RouterComponent = () => {
  return (
<Router
  navigationBarStyle={styles.navBar}
  titleStyle={styles.navBarTitle}
  barButtonTextStyle={styles.barButtonTextStyle}
  barButtonIconStyle={styles.barButtonIconStyle}
  sceneStyle={{ paddingTop: 54 }}>
     <Scene key="login" component={Login} initial />
     <Scene key="register" component={Register} title="Registro" />
     <Scene key= "registerProfilePicture" component ={ RegisterProfilePicture } title="Registro" />
     <Scene key="home" component={Home} title="PVApp"/>
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
