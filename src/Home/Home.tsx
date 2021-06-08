import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles, Typography } from '@material-ui/core';
import LoadSpinner from '../shared/Loader';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: theme.spacing(4),
    },
  };
});

export const Home = () => {
  const c = useStyles();
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  if (isLoading)
    return (
      <div>
        <LoadSpinner />
      </div>
    );
  if (error) return <div>{error.message}</div>;
  if (isAuthenticated) {
    return (
      <div className={c.root}>
        <Typography variant="h5" component="h2">
          Welcome to the party {user?.nickname}
        </Typography>
      </div>
    );
  } else {
    return (
      <div className={c.root}>
        <Typography variant="h5" component="h2">
          <h2>heeyy login and join the party</h2>
        </Typography>
      </div>
    );
  }
};
