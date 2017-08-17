const SERVER_IP = '192.168.1.12';


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

export const refreshStaticData = (token) => {
  return (dispatch) => {
    let staticData = {};

    invoke(token, 'provinces', 'GET', {}).then(async(provincesResponse) => {
      staticData.provinces = provincesResponse;
      dispatch({type: 'LOAD_STATIC_DATA', payload: staticData});
    });

    invoke(token, 'tico-stops', 'GET', {}).then(async(ticoStopsResponse) => {
      staticData.ticoStops = ticoStopsResponse;
      dispatch({type: 'LOAD_STATIC_DATA', payload: staticData});
    });

    invoke(token, 'touristic-interests', 'GET', {}).then(async(touristicInterestsResponse) => {
      staticData.touristicInterests = touristicInterestsResponse;
      dispatch({type: 'LOAD_STATIC_DATA', payload: staticData});
    });

    invoke(token, 'tourist-destinations', 'GET', {}).then(async(touristDestinationsResponse) => {
      staticData.touristDestinations = touristDestinationsResponse;
      dispatch({type: 'LOAD_STATIC_DATA', payload: staticData});
    });

    invoke(token, 'attributes', 'GET', {}).then(async (attributesResponse) => {
      staticData.attributes = attributesResponse;
      dispatch({type: 'LOAD_STATIC_DATA', payload: staticData});
    });
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
        console.log(registerResponse);
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

      });
    };
};

export const  reportD = ({token, body}) =>{
  console.log(token, body);
    return (dispatch) => {
    return invoke(token, 'report-destination', 'POST', body)
    .then(async(reportResponse) => {
      console.log(reportResponse);
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
  console.log(origin,destination);
  return fetch('https://maps.googleapis.com/maps/api/directions/json?origin=' + origin + '&destination=' + destination + '&key=AIzaSyAxFpWldamQAaPa6BKi5M4Fo9KB3nHTpf4', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json());

};

// Province Actions
export const selectProvince = data => {
  return {type: 'SELECT_PROVINCE', payload: data};
};
