import { FC, useState } from 'react';
import {
  Maybe,
  Project_Members,
  Users,
  useRemoveUserFromProjectMutation,
  useUpdateProjectUserRoleMutation,
} from '../lib/generated/apolloComponents';
import {
  Typography,
  CardContent,
  CardActions,
  Card,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { GetProjectById } from '../lib/graphql/project/queries/getProjectById';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import { Alert } from '@material-ui/lab';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      margin: theme.spacing(2, 0),
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dialogTitle: {
      display: 'flex',
      gap: theme.spacing(2),
    },
    dialogActions: {
      padding: theme.spacing(0, 4, 4, 0),
    },
  };
});

interface IProps {
  member: {
    __typename?: 'project_members' | undefined;
  } & Pick<Project_Members, 'id' | 'user_id' | 'type_id'> & {
      user?:
        | Maybe<
            {
              __typename?: 'users' | undefined;
            } & Pick<Users, 'email'>
          >
        | undefined;
    };
  id: string;
  ownerId: string | undefined;
}

const MemberCard: FC<IProps> = ({ member, id, ownerId }) => {
  const { user } = useAuth0();
  const { enqueueSnackbar } = useSnackbar();
  const c = useStyles();
  const [type, setType] = useState(member.type_id);
  const [
    removeUserFromProjectMutation,
    { data: removeUserData, loading: removeUserLoading, error: removeUserError },
  ] = useRemoveUserFromProjectMutation();

  const [
    updateProjectUserRoleMutation,
    { data: updateUserData, loading: updateUserLoading, error: updateUserError },
  ] = useUpdateProjectUserRoleMutation();

  const handleRemove = (memberId: any) => {
    enqueueSnackbar('Removing user from the project', {
      variant: 'info',
      autoHideDuration: 1000,
    });
    removeUserFromProjectMutation({
      variables: { memberId },
      refetchQueries: [{ query: GetProjectById, variables: { projectId: id } }],
    });
    if (removeUserError) {
      enqueueSnackbar(`${removeUserError.message}`, {
        variant: 'error',
      });
    }
    if (removeUserData) {
      enqueueSnackbar(
        `${removeUserData.delete_project_members_by_pk?.user?.email} is deleted successfully`,
        {
          variant: 'success',
          autoHideDuration: 3000,
        }
      );
    }
  };

  const handleUpdate = (memberId: any, typeId: any) => {
    enqueueSnackbar('Updating user type', {
      variant: 'info',
      autoHideDuration: 3000,
    });
    updateProjectUserRoleMutation({
      variables: {
        projectMemberId: memberId,
        typeId,
      },
      refetchQueries: [{ query: GetProjectById, variables: { projectId: id } }],
    });
    console.log(updateUserData);

    if (updateUserData) {
      enqueueSnackbar(
        `${updateUserData.update_project_members_by_pk?.user?.email} is updated successfully`,
        {
          variant: 'success',
          autoHideDuration: 3000,
        }
      );
    }
    if (updateUserError) {
      enqueueSnackbar(`${updateUserError.message}`, {
        variant: 'error',
      });
    }
  };

  // control dialog state
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType((event.target as HTMLInputElement).value);
  };

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let isOwner = ownerId === user?.sub;
  let isMember = member.type_id === process.env.REACT_APP_MEMBER_TYPE_ID;
  return (
    <>
      <Card className={c.root}>
        <CardContent className={c.content}>
          <Typography gutterBottom>{member.user?.email}</Typography>
          <Chip label={isMember ? 'member' : 'viewer'} color={isMember ? 'secondary' : 'default'} />
        </CardContent>
        {isOwner && (
          <CardActions>
            <Button
              size="small"
              color="secondary"
              onClick={() => handleRemove(member.id)}
              disabled={removeUserLoading}
            >
              Dismiss User
            </Button>
            <Button size="small" onClick={handleClickOpen}>
              Edit User Type
            </Button>
          </CardActions>
        )}
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <DialogTitle className={c.dialogTitle} id="alert-dialog-title" disableTypography={true}>
          <CreateRoundedIcon fontSize="large" />
          <Typography variant="h5" component="h4">
            Update user type
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom color="textSecondary">
            Select user type.
          </Typography>
          <Alert severity="info">
            Member type can create, delete, update and read the issues. Viewer type can read the
            issues and comment on them .
          </Alert>

          <FormControl>
            <RadioGroup aria-label="gender" name="gender1" value={type} onChange={handleChange}>
              <FormControlLabel
                value={process.env.REACT_APP_MEMBER_TYPE_ID}
                control={<Radio />}
                label="Member"
              />
              <FormControlLabel
                value={process.env.REACT_APP_VIEWER_TYPE_ID}
                control={<Radio />}
                label="Viewer"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions className={c.dialogActions}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => handleUpdate(member.id, type)}
          >
            {updateUserLoading ? 'updating' : 'update'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MemberCard;
