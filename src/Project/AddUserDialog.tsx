import React, { FC } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import { Button, makeStyles, Typography } from '@material-ui/core';

import AddUserForm from './AddUserForm';

const useStyles = makeStyles((theme) => {
  return {
    dialogTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
    },
    formControl: {
      marginBottom: theme.spacing(1),
      minWidth: 120,
    },
    form: {
      maxWidth: 550,
      marginTop: theme.spacing(4),
      margin: 'auto',
      border: `1px solid ${theme.palette.primary.main}`,
      width: '100%',
    },
    inputBox: {
      marginBottom: theme.spacing(3),
    },
    input: {
      fontFamily: theme.typography.fontFamily,
    },
  };
});

export interface IProps {
  projectId: string;
}

const AddUserDialog: FC<IProps> = ({ projectId }) => {
  const c = useStyles();

  // control dialog state
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        aria-label="add user"
        color="secondary"
        size="small"
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddCircleRoundedIcon />}
      >
        Add user
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title" className={c.dialogTitle} disableTypography={true}>
          <PersonAddRoundedIcon fontSize="large" />
          <Typography variant="h5" component="h4">
            Add a new user to the project
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can add other Jira-Clone users to this project for collaboration.
          </DialogContentText>
          <AddUserForm projectId={projectId} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddUserDialog;
