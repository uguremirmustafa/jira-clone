import React, { FC } from 'react';
// import { useHistory } from 'react-router-dom';
import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';

const Auth0ProviderWithHistory: FC = ({ children }) => {
  // const history = useHistory();

  const options: Auth0ProviderOptions = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    scope: 'read:current_user update:current_user_metadata',
  };

  // const onRedirectCallback = (appState) => {
  //   history.push(appState?.returnTo || window.location.pathname);
  // };

  return (
    <Auth0Provider
      {...options}
      redirectUri={window.location.origin}
      // onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
