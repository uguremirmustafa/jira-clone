import { Button } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, logout } = useAuth0();
  const Logout = () => logout({ returnTo: window.location.origin });
  return (
    <div>
      <Button
        onClick={
          isAuthenticated
            ? Logout
            : () =>
                loginWithRedirect({
                  redirectUri: process.env.REACT_APP_BASE_URL + '/projects',
                })
        }
      >
        {!isLoading ? (isAuthenticated ? 'logout' : 'login') : 'loading...'}
      </Button>
    </div>
  );
};

export default LoginButton;
