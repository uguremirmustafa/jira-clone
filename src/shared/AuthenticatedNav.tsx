import React from 'react';
import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  fade,
  ListItemIcon,
  Avatar,
} from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import SearchIcon from '@material-ui/icons/Search';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import InputBase from '@material-ui/core/InputBase';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { drawerWidth } from './Constants';
import { useGetProjectsQuery } from '../lib/generated/apolloComponents';
import Dropdown from './Dropdown';

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
    right: {
      display: 'flex',
      gap: '1rem',
    },
    brandName: {
      width: drawerWidth - 16,
      textDecoration: 'none',
      color: theme.palette.secondary.main,
    },
    listPaper: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    listItem: {
      padding: theme.spacing(2),
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
    sorryText: {
      padding: theme.spacing(1),
    },
  };
});
const AuthenticatedNav = () => {
  const c = useStyles();
  const { logout, user } = useAuth0();
  const Logout = () => logout({ returnTo: window.location.origin });

  const { data, loading, error } = useGetProjectsQuery();

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <AppBar className={c.appbar} color="transparent" elevation={2}>
      <Toolbar>
        <div className={c.left}>
          <Typography className={c.brandName} variant="h6" component={Link} to="/">
            Jira Clone
          </Typography>
          <Dropdown
            projects={data?.projects.filter((i) => i.project_owner.id === user?.sub)}
            text="Owned Projects"
          />
          <Dropdown
            projects={data?.projects.filter((i) => i.project_owner.id !== user?.sub)}
            text="Participated Projects"
          />
          <Button
            color="secondary"
            endIcon={<AddRoundedIcon />}
            component={Link}
            to="/createProject"
          >
            create project
          </Button>
        </div>
        <div className={c.right}>
          <div className={c.search}>
            <div className={c.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: c.inputRoot,
                input: c.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Button onClick={Logout}>logout</Button>
          <Avatar alt={user?.name || user?.nickname} src={user?.picture} color="secondary" />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AuthenticatedNav;
