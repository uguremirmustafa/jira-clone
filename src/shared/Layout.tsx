import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { appBarHeight } from './Constants';
import Navbar from './Navbar';
import { Sidebar } from './Sidebar';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      marginTop: appBarHeight,
    },
    main: {
      padding: theme.spacing(2),
    },
  };
});

const Layout: FC = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  const c = useStyles();
  return (
    <div>
      <Navbar />
      <div className={c.root}>
        {isAuthenticated && <Sidebar />}
        <main className={c.main}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
