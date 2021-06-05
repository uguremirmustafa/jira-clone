import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';

const options: Auth0ProviderOptions = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
  redirectUri: window.location.origin,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
};
ReactDOM.render(
  <Auth0Provider {...options}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
