import { Avatar, makeStyles, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { GetProjectByIdQuery } from '../lib/generated/apolloComponents';
import AddUserDialog from './AddUserDialog';
const useStyles = makeStyles((theme) => {
  return {
    header: {
      marginBottom: theme.spacing(8),
    },
    users: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
    },
  };
});

interface IProps {
  id: string;
  project: GetProjectByIdQuery | undefined;
}

const Board: FC<IProps> = ({ project, id }) => {
  const c = useStyles();
  const title = project?.projects_by_pk?.title;

  return (
    <div>
      <div className={c.header}>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
      </div>
      <div className={c.users}>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
        <Avatar>C</Avatar>
        <AddUserDialog projectId={id} />
      </div>
    </div>
  );
};

export default Board;
