import React from 'react';
import { AppBar, makeStyles, Toolbar, Typography, fade } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { drawerWidth } from './Constants';

const useStyles = makeStyles((theme) => {
  return {
    appbar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.common.white,
    },
    left: {
      flexGrow: 1,
      display: 'flex',
      gap: '1rem',
    },
    brandName: {
      width: drawerWidth - 16,
      textDecoration: 'none',
      color: theme.palette.secondary.main,
    },
    search: {
      position: 'relative',
      border: theme.palette.primary.dark,
      borderWidth: '.1rem',
      borderStyle: 'solid',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      '&:active': {
        border: theme.palette.secondary.main,
      },
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  };
});
const UnauthenticatedNav = () => {
  const c = useStyles();
  const { loginWithRedirect } = useAuth0();

  return (
    <AppBar className={c.appbar} color="transparent" elevation={2}>
      <Toolbar>
        <div className={c.left}>
          <Typography className={c.brandName} variant="h6" component={Link} to="/">
            Jira Clone
          </Typography>
        </div>

        <Button
          onClick={() =>
            loginWithRedirect({
              redirectUri: process.env.REACT_APP_BASE_URL + '/projects',
            })
          }
        >
          login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default UnauthenticatedNav;
