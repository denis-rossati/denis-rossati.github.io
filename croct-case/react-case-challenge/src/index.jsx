import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CroctProvider } from '@croct/plug-react';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CroctProvider track appId="00000000-0000-0000-0000-000000000000">
        <App />
      </CroctProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
