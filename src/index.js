import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
} from 'react-router-dom';
import App from './App';

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
