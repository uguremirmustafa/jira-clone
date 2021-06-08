import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress } from '@material-ui/core';
import AuthenticatedNav from './AuthenticatedNav';
import UnauthenticatedNav from './UnauthenticatedNav';
const Navbar = () => {
  const { isAuthenticated, error, isLoading } = useAuth0();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  if (isAuthenticated) {
    return <AuthenticatedNav />;
  } else {
    return <UnauthenticatedNav />;
  }
};

export default Navbar;
