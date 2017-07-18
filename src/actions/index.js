const SERVER_IP = '192.168.86.23';

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

export const login = ({username, password, token}) => {
  console.log(token);
  return (dispatch) => {

     return fetch('http://' + SERVER_IP + ':8080/api/authenticateUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(
       {
         username: username,
         password: password
      })
   })
    .then((response) => response.json())
    // Save token and load static info
    .then(async (authUserResponse) => {
      console.log(authUserResponse);
     let staticData = {};

     invoke(token, 'provinces', 'GET', {})
     .then(async (provincesResponse) => {
       staticData.provinces = provincesResponse;

       invoke(token, 'tico-stops', 'GET', {})
       .then(async (ticoStopsResponse) => {
         staticData.ticoStops = ticoStopsResponse;

         invoke(token, 'touristic-interests', 'GET', {})
         .then(async (touristicInterestsResponse) => {
           staticData.touristicInterests = touristicInterestsResponse;

           invoke(token, 'tourist-destinations', 'GET', {})
           .then(async (touristDestinationsResponse) => {
             staticData.touristDestinations = touristDestinationsResponse;

             // Save object with all static info
             dispatch({type: 'LOAD_STATIC_DATA', payload: staticData});
           }); // end touristDestinations invoke
         }); // end touristicInterests invoke
       }); // end ticoStops invoke
     }); // end provinces invoke
   }); // end of authenticate User
 }; // end dispatch function
}; // end login function

// Generic method to make http request
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
