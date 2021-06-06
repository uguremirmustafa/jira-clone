import { FC } from 'react';
import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';

const DEFAULT_REDIRECT = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

const CustomAuth0Provider: FC = ({ children }) => {
  const options: Auth0ProviderOptions = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    redirectUri: window.location.origin,
    onRedirectCallback: DEFAULT_REDIRECT,
  };

  return <Auth0Provider {...options}>{children}</Auth0Provider>;
};

export default CustomAuth0Provider;
