import { AppBar, makeStyles, Toolbar, Typography, fade } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import LoginButton from './LoginButton';

const useStyles = makeStyles((theme) => {
  return {
    appbar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.primary.light,
    },
    brandName: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      border: theme.palette.primary.main,
      borderWidth: '.1rem',
      borderStyle: 'solid',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
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
const Navbar = () => {
  const c = useStyles();
  return (
    <AppBar className={c.appbar} color="transparent" elevation={2}>
      <Toolbar>
        <Typography className={c.brandName} variant="h6" component="h1">
          Jira Clone
        </Typography>
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
        <LoginButton />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
