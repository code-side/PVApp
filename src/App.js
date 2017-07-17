import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Router from './Router';
import ReduxThunk from 'redux-thunk';

const App = () => {
  return (
    <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
      <Router />
    </Provider>
  );
};

export default App;
