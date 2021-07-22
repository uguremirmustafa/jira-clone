// material components
import { Avatar, makeStyles, Tooltip, Typography, Breadcrumbs } from '@material-ui/core';
// material icons
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CategoryRounded from '@material-ui/icons/CategoryRounded';
import { FC } from 'react';
import { Link } from 'react-router-dom';
// queries
import { GetProjectByIdQuery, Issues } from '../lib/generated/apolloComponents';
import AddUserDialog from './AddUserDialog';
// import AddIssueDialog from './AddIssueDialog';
import KanbanBoard from './KanbanBoard';
import { Skeleton } from '@material-ui/lab';
import { BoardSkeleton } from './loadingSkeletons/BoardSkeleton';

// styling
const useStyles = makeStyles((theme) => {
  return {
    header: {
      marginBottom: theme.spacing(4),
    },
    breadcrumbs: {
      marginBottom: theme.spacing(4),
    },
    link: {
      display: 'flex',
      textDecoration: 'none',
      transition: '300ms ease-in-out color',
      '&:hover': {
        color: theme.palette.text.primary,
      },
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
    users: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      marginBottom: theme.spacing(4),
    },
  };
});

// interface
interface IProps {
  projectId: string;
  project: GetProjectByIdQuery | undefined;
  isOwner: boolean;
  isMember: boolean;
  isOwnerOrMember: boolean;
  loading: boolean;
  // subs: () => void;
}

// component
const Board: FC<IProps> = ({
  project,
  projectId,
  isOwner,
  isMember,
  isOwnerOrMember,
  loading,
  // subs,
}) => {
  const c = useStyles();

  const title = project?.projects_by_pk?.title;
  const users = project?.projects_by_pk?.project_members;

  const issues = project?.projects_by_pk?.issues;

  const columns = project?.projects_by_pk?.columns;
  return (
    <>
      {/* breadcrumbs section */}
      <Breadcrumbs aria-label="breadcrumb" className={c.breadcrumbs}>
        <Typography color="inherit" className={c.link} component={Link} to="/projects">
          <HomeIcon className={c.icon} />
          Projects
        </Typography>
        <Typography
          color="inherit"
          className={c.link}
          component={Link}
          to={`/project/${projectId}/settings`}
        >
          <CategoryRounded className={c.icon} />
          {loading ? <Skeleton width={150} height={30} /> : title}
        </Typography>
        <Typography color="textPrimary" className={c.link}>
          <DashboardIcon className={c.icon} />
          Board
        </Typography>
      </Breadcrumbs>
      {/* end of readcrumbs section */}

      {/* project title */}
      <div className={c.header}>
        <Typography variant="h4" component="h2">
          {loading ? <Skeleton /> : title}
        </Typography>
      </div>
      {/* end of project title */}

      {/* project users avatar list */}
      <div className={c.users}>
        {users?.map((item) => {
          let isMember = item.type_id === process.env.REACT_APP_MEMBER_TYPE_ID;
          return (
            <Tooltip
              title={`${item.user?.email} | ${isMember ? 'member' : 'viewer'}`}
              key={item.user_id}
            >
              {loading ? (
                <Skeleton />
              ) : (
                <Avatar>{item.user?.email.substring(0, 1).toUpperCase()}</Avatar>
              )}
            </Tooltip>
          );
        })}
        {isOwner && <AddUserDialog projectId={projectId} />}
      </div>
      {/* end of project users avatar list */}

      {/* create issue button */}
      {/* {isMember && <AddIssueDialog projectId={projectId} />} */}
      {/* end of create issue button */}

      {/* kanban board */}
      {loading ? (
        <BoardSkeleton loading={loading} />
      ) : (
        <KanbanBoard
          columns={columns}
          projectId={projectId}
          isOwnerOrMember={isOwnerOrMember}
          issues={issues}
        />
      )}
      {/* end of kanban board */}
    </>
  );
};

export default Board;
