import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import RouteHandler from './RouteHandler';
import store from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouteHandler />
    </Provider>
  </React.StrictMode>
);
