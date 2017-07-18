import React from 'react';

import { Router, Scene } from 'react-native-router-flux';

import Login from './views/Login';
import I18n from './services/languageService';
import Home from './views/Home';
import Register from './views/Register';
import RegisterProfilePicture from './views/RegisterProfilePicture';

//TicoStop
import TicoStopList from './views/TicoStopList';
import TicoStop from './views/TicoStop';

//TouristicInterest
import TouristicInterestList from './views/TouristicInterestList';
import TouristicInterest from './views/TouristicInterest';

// Provinces
import ProvinceList from './views/provinceList';
import ProvinceInfo from './views/provinceInfo';

//touristDestionations
import TouristDestinationList from './views/TouristDestinationList';
import TouristDestination from './views/TouristDestination';


import Splash from './views/Splash';

import AppSettings from './views/AppSettings';

const RouterComponent = () => {
  return (
<Router
  navigationBarStyle={styles.navBar}
  titleStyle={styles.navBarTitle}
  barButtonTextStyle={styles.barButtonTextStyle}
  barButtonIconStyle={styles.barButtonIconStyle}
  sceneStyle={{ paddingTop: 54 }}>
     <Scene key="splash" component={Splash} initial />
     <Scene key="login" component={Login} type="reset"/>
     <Scene key="register" component={Register} title="Registro" />
     <Scene key= "registerProfilePicture" component ={ RegisterProfilePicture } title="Registro" />
     <Scene key="home" component={Home} type="reset" title="PVApp" />
     <Scene key="provList" component={ProvinceList} title={I18n.t('titles.provinces')} />
     <Scene key="provInfo" component={ProvinceInfo} />
     <Scene key="touristDestionations" component={TouristDestinationList} title="Destinos turisticos"/>
     <Scene key="touristDestionation" component={TouristDestination} title="Destino turisticos"/>
     <Scene key="ticoStopList" component={TicoStopList} title="Tico Stops"/>
     <Scene key="ticoStop" component={TicoStop}/>
     <Scene key="touristicInterestList" component={TouristicInterestList} title="Interés turístico"/>
     <Scene key="touristicInterest" component={TouristicInterest}/>
     <Scene key="appSettings" component={AppSettings} title="Perfil"/>

    </Router>
  );
};

const styles = {
  navBar: {
    backgroundColor: '#5069c3'
  },
  navBarTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  barButtonTextStyle: {
    color: '#FFFFFF'
  },
  barButtonIconStyle: {
    tintColor: 'rgb(255,255,255)'
  }
};

export default RouterComponent;
