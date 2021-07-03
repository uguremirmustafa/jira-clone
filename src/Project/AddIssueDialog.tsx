import React, { FC, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import { Button, makeStyles, Typography } from '@material-ui/core';
import AddIssueForm from './AddIssueForm';

const useStyles = makeStyles((theme) => {
  return {
    createButton: {
      marginBottom: theme.spacing(4),
    },
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

const AddIssueDialog: FC<IProps> = ({ projectId }) => {
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
        aria-label="create issue"
        color="secondary"
        size="medium"
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddCircleRoundedIcon />}
        className={c.createButton}
      >
        Create Issue
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
            Create Issue
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Create a new issue to track your project progress!
          </DialogContentText>
          <AddIssueForm projectId={projectId} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddIssueDialog;
