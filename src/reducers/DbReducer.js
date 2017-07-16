const INITIAL_STATE = { msg: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'welcome':
      return { ...state, msg: action.payload };
    case 'saveToken':
      return {...state, token: action.payload };
    default:
    return state;
  }
};
