import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { appBarHeight } from '../shared/Constants';
import { ProjectSidebar } from './ProjectSidebar';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      marginTop: appBarHeight,
    },
    main: {
      backgroundColor: theme.palette.common.white,
      width: '100%',
      minHeight: `calc(100vh - ${appBarHeight})`,
    },
    content: {
      padding: theme.spacing(2),
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

interface IProps {
  id: string;
  projectTitle: string | undefined;
  isOwner: boolean;
  loading: Boolean;
}

const ProjectLayout: FC<IProps> = ({ children, id, projectTitle, isOwner, loading }) => {
  const { isAuthenticated } = useAuth0();

  const c = useStyles();

  return (
    <div>
      <div className={c.root}>
        {isAuthenticated && (
          <ProjectSidebar id={id} projectTitle={projectTitle} isOwner={isOwner} loading={loading} />
        )}
        <main className={c.main}>
          <div className={c.content}>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default ProjectLayout;
