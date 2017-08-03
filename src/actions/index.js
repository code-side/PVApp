const SERVER_IP = '192.168.86.26';

export const saveLoggedUser = (user) => {
  return {
    type: 'SAVE_LOGGED_USER',
    payload: user
  };
};

export const updateConfig = (config) => {
  return {
    type: 'UPDATE_CONFIG',
    payload: config
  };
};

export const saveTokenToApp = () => {
  return (dispatch) => {
    return fetch('http://' + SERVER_IP + ':8080/api/authenticate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'user',
          password: 'user',
          rememberMe: true
        })
      })
      .then((response) => response.json())
      // Save token and load static info
      .then(async(responseJson) => {
        const token = responseJson.id_token;
        console.log(token);
        dispatch({
          type: 'SAVE_TOKEN',
          payload: 'Bearer ' + token
        });
      });
  };
};

export const login = ({
  username,
  password,
  token
}) => {
  return (dispatch) => {

    return fetch('http://' + SERVER_IP + ':8080/api/authenticateUser', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then((response) => response.json())
      // Save token and load static info
      .then(async(authUserResponse) => {
        dispatch({
          type: 'SAVE_LOGGED_USER',
          payload: authUserResponse
        });
        let staticData = {};

        invoke(token, 'provinces', 'GET', {})
          .then(async(provincesResponse) => {
            staticData.provinces = provincesResponse;

            invoke(token, 'tico-stops', 'GET', {})
              .then(async(ticoStopsResponse) => {
                staticData.ticoStops = ticoStopsResponse;

                invoke(token, 'touristic-interests', 'GET', {})
                  .then(async(touristicInterestsResponse) => {
                    staticData.touristicInterests = touristicInterestsResponse;

                    invoke(token, 'tourist-destinations', 'GET', {})
                      .then(async(touristDestinationsResponse) => {
                        staticData.touristDestinations = touristDestinationsResponse;

                        invoke(token, 'Attributes', 'GET', {})
                          .then(async(attributesResponse) => {
                            staticData.attributes = attributesResponse;
                            console.log(staticData);
                            // Save object with all static info
                            dispatch({
                              type: 'LOAD_STATIC_DATA',
                              payload: staticData
                            });
                          }); // end attributes invoke
                      }); // end touristDestinations invoke
                  }); // end touristicInterests invoke
              }); // end ticoStops invoke
          }); // end provinces invoke
      }).catch((error) => {
        console.log(error);
      }); // end of authenticate User
  }; // end dispatch function
}; // end login function

export const regiseterUser = ({token, user}) => {
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
      // Save token and load static info
      .then(async(registerResponse) => {
        console.log(registerResponse);
        dispatch({
          type: 'SAVE_LOGGED_USER',
          payload: registerResponse
        });
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
      })
      .then((response) => response.json());
  } else {
    return fetch('http://' + SERVER_IP + ':8080/api/' + url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(body)
      })
      .then((response) => response.json());
  }
};

// Province Actions
export const selectProvince = data => {
  return {
    type: 'SELECT_PROVINCE',
    payload: data
  };
};
