import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { GetProjectByIdQuery } from '../lib/generated/apolloComponents';

interface IProps {
  id: string;
  project: GetProjectByIdQuery | undefined;
}

const Board: FC<IProps> = ({ project }) => {
  const title = project?.projects_by_pk?.title;
  const description = project?.projects_by_pk?.description;

  return (
    <div>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <Typography variant="subtitle1" component="h2">
        {description}
      </Typography>
    </div>
  );
};

export default Board;
