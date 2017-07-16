export const welcome = (data) => {
  return {
    type: 'welcome',
    payload: data
  };
};

export const saveToken = (data) => {
  return {
    type: 'saveToken',
    payload: data
  };
};
