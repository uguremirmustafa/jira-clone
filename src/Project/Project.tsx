import { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import ProjectLayout from './ProjectLayout';
import { Route, Switch } from 'react-router-dom';
import Settings from './Settings';
import DangerZone from './DangerZone';
import Board from './Board';
import {
  SubscribeToProjectByProjectIdDocument,
  useGetProjectByIdQuery,
} from '../lib/generated/apolloComponents';
import { useAuth0 } from '@auth0/auth0-react';
import IssueDialog from './IssueDialog';

// interface
interface IProps extends RouteComponentProps<{ id: string }> {}

export const Project: FC<IProps> = ({ match }) => {
  const { user, isLoading: userLoading } = useAuth0();
  let projectId = match.params.id;
  const {
    data: project,
    loading: projectLoading,
    error: projectError,
    subscribeToMore,
  } = useGetProjectByIdQuery({
    variables: {
      projectId,
    },
  });
  subscribeToMore({
    document: SubscribeToProjectByProjectIdDocument,
    variables: { projectId },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newIssuesData = subscriptionData.data.projects_by_pk?.issues;
      const newColumnsData = subscriptionData.data.projects_by_pk?.columns;
      return Object.assign({}, prev, {
        ...prev,
        projects_by_pk: {
          ...prev.projects_by_pk,
          issues: newIssuesData,
          columns: newColumnsData,
        },
      });
    },
  });

  let loading = userLoading || projectLoading;

  if (projectError) {
    return <div>{projectError?.message}</div>;
  }
  let isOwner = user?.sub === project?.projects_by_pk?.owner_id;
  let isMember = project?.projects_by_pk?.project_members.find(
    (e) => e.user_id === user?.sub && e.type_id === process.env.REACT_APP_MEMBER_TYPE_ID
  )
    ? true
    : false;

  let isOwnerOrMember = isOwner || isMember;
  return (
    <ProjectLayout
      id={projectId}
      projectTitle={project?.projects_by_pk?.title}
      isOwner={isOwner}
      loading={loading}
    >
      <Route
        component={() => (
          <Settings projectId={projectId} isOwner={isOwner} loading={loading} project={project} />
        )}
        path={`/project/${projectId}/settings`}
      />
      <Route
        component={() => (
          <Board
            projectId={projectId}
            project={project}
            isOwner={isOwner}
            isMember={isMember}
            isOwnerOrMember={isOwnerOrMember}
            loading={loading}
            // subs={SubscribeToIssueUpdates}
          />
        )}
        path={`/project/${projectId}/board`}
      />
      {isOwner && (
        <Route
          component={() => <DangerZone id={projectId} />}
          path={`/project/${projectId}/danger`}
        />
      )}
      <Route
        path={`/project/${projectId}/board/issue/:issueId`}
        component={() => <IssueDialog isMember={isMember} />}
      />
    </ProjectLayout>
  );
};
