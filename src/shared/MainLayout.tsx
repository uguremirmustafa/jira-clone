import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { appBarHeight } from '../shared/Constants';
import LoadSpinner from '../shared/Loader';

const useStyles = makeStyles((theme) => {
  return {
    main: {
      marginTop: appBarHeight,
      backgroundColor: theme.palette.common.white,
      width: '100%',
      minHeight: `calc(100vh - ${appBarHeight})`,
    },
    spinnerWrapper: {
      position: 'relative',
      height: `calc(100vh - ${appBarHeight})`,
      width: '100%',
      zIndex: theme.zIndex.appBar + 10,
      top: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});

const MainLayout: FC = ({ children }) => {
  const { isLoading } = useAuth0();

  const c = useStyles();

  if (isLoading)
    return (
      <div className={c.spinnerWrapper}>
        <LoadSpinner />
      </div>
    );
  return (
    <div>
      <main className={c.main}>{children}</main>
    </div>
  );
};

export default MainLayout;
