import React from 'react';

import { Router, Scene } from 'react-native-router-flux';

import Login from './views/Login';
import I18n from './services/LanguageService';
import Home from './views/Home';
import Register from './views/Register';
import AppSettings from './views/AppSettings';
import Configuration from './views/Configuration';
import Profile from './views/Profile';
import EditProfile from './views/EditProfile';
import Splash from './views/Splash';
import RegisterProfilePicture from './views/RegisterProfilePicture';

//TicoStop
import TicoStopList from './views/TicoStopList';
import TicoStop from './views/TicoStop';

//TouristicInterest
import TouristicInterestList from './views/TouristicInterestList';
import TouristicInterest from './views/TouristicInterest';

// Provinces
import ProvinceList from './views/ProvinceList';
import ProvinceInfo from './views/ProvinceInfo';

//touristDestionations
import TouristDestinationList from './views/TouristDestinationList';
import TouristDestination from './views/TouristDestination';
import FavoriteDestinationList from './views/FavoriteDestinationList'
import TouristDestinationFilter from './views/TouristDestinationFilter';


//MapView
import Nearby from './views/Nearby';

//Generic
import ViewMoreList from './views/ViewMoreList';

const RouterComponent = () => {
  return (
    <Router
      navigationBarStyle={styles.navBar}
      titleStyle={styles.navBarTitle}
      barButtonTextStyle={styles.barButtonTextStyle}
      barButtonIconStyle={styles.barButtonIconStyle}
      sceneStyle={{ paddingTop: 54 }}
    >
      <Scene key="splash" component={Splash} hideNavBar={true}  initial/>
      <Scene key="login" component={Login} title="" hideNavBar={true} type="reset"/>
      <Scene key="register" component={Register} title="Registro"/>
      <Scene key="registerProfilePicture" component ={RegisterProfilePicture} title="Registro"/>
      <Scene key="home" component={Home} title="PVApp" type="reset"/>
      <Scene key="provList" component={ProvinceList} title="Provincias"/>
      <Scene key="provInfo" component={ProvinceInfo}/>
      <Scene key="touristDestinations" component={TouristDestinationList} title="Destinos turísticos"/>
      <Scene key="touristDestinationFilter" component={TouristDestinationFilter} title="Filtros"/>
      <Scene key="touristDestination" component={TouristDestination}/>
      <Scene key="favoriteList" component={FavoriteDestinationList}/>
      <Scene key="ticoStopList" component={TicoStopList} title="Tico Stops"/>
      <Scene key="ticoStop" component={TicoStop}/>
      <Scene key="touristicInterestList" component={TouristicInterestList} title="Interés turístico"/>
      <Scene key="touristicInterest" component={TouristicInterest}/>
      <Scene key="viewMore" component={ViewMoreList}/>
      <Scene key="showMap" component={Nearby}/>
      <Scene key="appSettings" component={AppSettings} title="Perfil"/>
      <Scene key="config" component={Configuration} title={I18n.t('titles.settings')}/>
      <Scene key= "profile" component={Profile} title="Perfil"/>
      <Scene key= "editProfile" component={EditProfile} hideNavBar={true}   sceneStyle={{ paddingTop: 0 }} title="Ver Perfil"/>
    </Router>
  );
};

const styles = {
  navBar: {
    backgroundColor: '#2980b9'
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
