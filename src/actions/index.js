import I18n from '../services/LanguageService';

const SERVER_IP = '192.168.1.10';

export const saveLoggedUser = (user) => {
  return {type: 'SAVE_LOGGED_USER', payload: user};
};

export const updateConfig = (config) => {
  return {type: 'UPDATE_CONFIG', payload: config};
};

export const saveTokenToApp = () => {
  return (dispatch) => {
  return fetch('http://' + SERVER_IP + ':8080/api/authenticate', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
   },
   body: JSON.stringify(
    {
      username: 'user',
      password: 'user',
      rememberMe: true
   })
  })
  .then((response) => response.json())
  // Save token and load static info
  .then(async (responseJson) => {
   const token = responseJson.id_token;
   dispatch({type: 'SAVE_TOKEN', payload:'Bearer ' + token});
 });
 };
};

export const modifyUser = ({token, user})=> {
  return (dispatch)=>{
    return fetch('http://' + SERVER_IP + ':8080/api/p-v-app-users', {
      method:'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(user)
    })
    .then((response) => response.json())
    // Save token and load static info
    .then(async (userResponse) => {
      dispatch({type: 'SAVE_LOGGED_USER', payload: userResponse});
   });
  };
};

export const login = ({username, password, token}) => {
  return (dispatch) => {
    return fetch('http://' + SERVER_IP + ':8080/api/authenticateUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({username: username, password: password})
    }).then((response) => response.json())
    // Save token and load static info
      .then(async(authUserResponse) => {
      dispatch({type: 'SAVE_LOGGED_USER', payload: authUserResponse});
   }).catch((error) => {
         console.log(error);
  }); // end of authenticate User
 }; // end dispatch function
}; // end login function

// Refresh a module data
export const refreshData = (token, url, propToUpdate, staticData, dispatch) => {
  if (dispatch !== undefined) {
    invoke(token, url, 'GET', {}).then(async(response) => {
      staticData[propToUpdate] = response;
      dispatch({type: 'LOAD_STATIC_DATA', payload: staticData});
    });
  } else {
    return (newDispatch) => {
      invoke(token, url, 'GET', {}).then(async(response) => {
        staticData[propToUpdate] = response;
        newDispatch({type: 'LOAD_STATIC_DATA', payload: staticData});
      });
    };
  }
};

// Refresh all application static data
export const refreshStaticData = (token) => {
  const locale = I18n.getLocale();

  return (dispatch) => {
    let staticData = {};

    refreshData(token, 'provinces?lang=' + locale, 'provinces', staticData, dispatch);
    refreshData(token, 'tico-stops?lang=' + locale, 'ticoStops', staticData, dispatch);
    refreshData(token, 'touristic-interests?lang=' + locale, 'touristicInterests', staticData, dispatch);
    refreshData(token, 'tourist-destinations?lang=' + locale, 'touristDestinations', staticData, dispatch);
    refreshData(token, 'attributes?lang=' + locale, 'attributes', staticData, dispatch);
    refreshData(token, 'survey-questions?lang=' + locale, 'surveyQuestions', staticData, dispatch);
  };
};

export const registerUser = ({token, user}) => {
  return (dispatch) => {
    return fetch('http://' + SERVER_IP + ':8080/api/p-v-app-users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(user)
      })
      .then((response) => response.json())

      .then(async(registerResponse) => {
        dispatch({
          type: 'SAVE_LOGGED_USER',
          payload: registerResponse
        });
      });
    };
  };

export const  saveComments = ({token, body, url}) =>{
    return (dispatch) => {
    return invoke(token, url, 'PUT', body)
      .then(async(registerResponse) => {
        // do nothing...
      });
    };
};

export const  reportD = ({token, body}) =>{
    return (dispatch) => {
    return invoke(token, 'report-destination', 'POST', body)
    .then(async(reportResponse) => {
      });
    };
};

export const getTouristDestination = ({token, id})=>{
  return (dispatch) => {
  return invoke(token, 'tourist-destinations/' + id, 'GET',{})
  .then(async(response) => {
    return response;
    });
  };
};

// Generic method to make http request to PVApp API
export const invoke = (token, url, method, body) => {
  if (method === 'GET') {
    return fetch('http://' + SERVER_IP + ':8080/api/' + url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then((response) => response.json());
  } else {
    return fetch('http://' + SERVER_IP + ':8080/api/' + url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(body)
    }).then((response) => response.json());
  }
};

export const getDirections = (origin, destination) => {

  return fetch('https://maps.googleapis.com/maps/api/directions/json?origin=' + origin + '&destination=' + destination + '&key=AIzaSyAxFpWldamQAaPa6BKi5M4Fo9KB3nHTpf4', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json());
};
