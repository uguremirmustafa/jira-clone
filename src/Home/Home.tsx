import { useAuth0 } from '@auth0/auth0-react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LoadSpinner from '../shared/Loader';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: '70vh',
      padding: theme.spacing(4),
      gap: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
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
        <Button component={Link} to="/createProject" variant="contained" color="secondary">
          Create Project
        </Button>
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
