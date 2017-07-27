const INITIAL_STATE = { selected: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SELECT_PROVINCE':
      return {...state, selected: action.payload };
    default:
    return state;
  }
};
