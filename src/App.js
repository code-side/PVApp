import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import Router from './Router';

const App = () => {
  return (
    <Provider store={createStore(reducers)}>
      <Router />
    </Provider>
  );
};

export default App;
