import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';
import Auth0ProviderWithHistory from './lib/auth/authProviderWithHistory';

// const options: Auth0ProviderOptions = {
//   domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
//   clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
//   redirectUri: window.location.origin,
//   audience: process.env.REACT_APP_AUTH0_AUDIENCE,
//   scope: 'read:current_user update:current_user_metadata',
// };
ReactDOM.render(
  // <Auth0Provider {...options}>
  <Auth0ProviderWithHistory>
    <App />
  </Auth0ProviderWithHistory>,
  // </Auth0Provider>,
  document.getElementById('root')
);
