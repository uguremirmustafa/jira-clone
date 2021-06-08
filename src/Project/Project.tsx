import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import ProjectLayout from './ProjectLayout';
import { Route } from 'react-router-dom';
import Settings from './Settings';

interface IProps extends RouteComponentProps<{ id: string }> {}

export const Project: FC<IProps> = ({ match }) => {
  let projectId = match.params.id;

  return (
    <ProjectLayout id={projectId}>
      <Route
        component={() => <Settings id={projectId} />}
        path={`/project/${projectId}/settings`}
      />
    </ProjectLayout>
  );
};
