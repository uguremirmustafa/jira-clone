import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import ProjectLayout from './ProjectLayout';
import { Route } from 'react-router-dom';
import Settings from './Settings';
import DangerZone from './DangerZone';
import Board from './Board';
import { useGetProjectByIdQuery } from '../lib/generated/apolloComponents';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

interface IProps extends RouteComponentProps<{ id: string }> {}

const useStyles = makeStyles((theme) => {
  return {
    skeletonWrapper: {
      padding: theme.spacing(4),
      display: 'flex',
      gap: theme.spacing(4),
    },
    skeletonColumn: {
      display: 'grid',
      gap: theme.spacing(2),
      width: 200,
    },
    skeletonBody: {
      display: 'grid',
      gap: theme.spacing(2),
      width: '100%',
      gridTemplateColumns: '1fr 1fr 1fr',
    },
    skeletonTitle: {
      gridColumn: '1/4',
    },
  };
});

export const Project: FC<IProps> = ({ match }) => {
  const c = useStyles();
  const { user, isLoading } = useAuth0();
  let projectId = match.params.id;
  const { data, loading, error } = useGetProjectByIdQuery({
    variables: {
      id: projectId,
    },
  });

  if (loading || isLoading) {
    return (
      <div className={c.skeletonWrapper}>
        <div className={c.skeletonColumn}>
          <Skeleton variant="rect" height={80} />
          <Skeleton variant="rect" height={40} />
          <Skeleton variant="rect" height={40} />
          <Skeleton variant="rect" height={40} />
          <Skeleton variant="rect" height={40} />
        </div>
        <div className={c.skeletonBody}>
          <Skeleton variant="rect" height={40} className={c.skeletonTitle} />
          <Skeleton variant="rect" height={300} />
          <Skeleton variant="rect" height={300} />
          <Skeleton variant="rect" height={300} />
        </div>
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  let isOwner = user?.sub === data?.projects_by_pk?.owner_id;
  let isMember = data?.projects_by_pk?.project_members.find(
    (e) => e.user_id === user?.sub && e.type_id === process.env.REACT_APP_MEMBER_TYPE_ID
  )
    ? true
    : false;

  return (
    <ProjectLayout id={projectId} projectTitle={data?.projects_by_pk?.title} isOwner={isOwner}>
      <Route
        component={() => <Settings id={projectId} isOwner={isOwner} />}
        path={`/project/${projectId}/settings`}
      />
      <Route
        component={() => (
          <Board id={projectId} project={data} isOwner={isOwner} isMember={isMember} />
        )}
        path={`/project/${projectId}/board`}
      />
      {isOwner && (
        <Route
          component={() => <DangerZone id={projectId} />}
          path={`/project/${projectId}/danger`}
        />
      )}
    </ProjectLayout>
  );
};
