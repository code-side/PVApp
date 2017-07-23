const INITIAL_STATE = {
  lang: 'en',
  notifications: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_CONFIG':
      return {...state, appConfig: action.payload };
    default:
    return state;
  }
};
