import { Avatar, makeStyles, Tooltip, Typography } from '@material-ui/core';
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
  const users = project?.projects_by_pk?.project_members;

  return (
    <div>
      <div className={c.header}>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
      </div>
      <div className={c.users}>
        {users?.map((item) => {
          let isMember = item.type_id === process.env.REACT_APP_MEMBER_TYPE_ID;
          return (
            <Tooltip
              title={`${item.user?.email} | ${isMember ? 'member' : 'viewer'}`}
              key={item.user_id}
            >
              <Avatar>{item.user?.email.substring(0, 1).toUpperCase()}</Avatar>
            </Tooltip>
          );
        })}

        <AddUserDialog projectId={id} />
      </div>
    </div>
  );
};

export default Board;
