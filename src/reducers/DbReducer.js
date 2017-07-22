const INITIAL_STATE = { staticData: {} };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SAVE_TOKEN':
      return {...state, token: action.payload };
    case 'LOAD_STATIC_DATA':
      return {...state, staticData: action.payload};
      case 'SAVE_LOGGED_USER':
        return {...state, user: action.payload};
    default:
    return state;
  }
};
