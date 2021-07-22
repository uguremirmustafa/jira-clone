import React from 'react';
// material ui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
// zustand
import create from 'zustand';
import { Alert } from '@material-ui/lab';

type ConfirmDialogStore = {
  message: string;
  onSubmit?: () => void;
  close: () => void;
};

const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
  message: '',
  onSubmit: undefined,
  close: () => set({ onSubmit: undefined }),
}));

export const confirmDialog = (message: string, onSubmit: () => void) => {
  useConfirmDialogStore.setState({
    message,
    onSubmit,
  });
};

const useStyles = makeStyles((theme) => {
  return {
    actions: {
      padding: theme.spacing(2),
    },
  };
});

const ConfirmDialog = () => {
  const c = useStyles();
  const { message, onSubmit, close } = useConfirmDialogStore();
  return (
    <Dialog open={Boolean(onSubmit)} onClose={close} maxWidth="sm" fullWidth>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle>Confirm the action</DialogTitle>
        <IconButton onClick={close}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Alert severity="error">{message}</Alert>
      </DialogContent>
      <DialogActions className={c.actions}>
        <Button color="primary" variant="contained" onClick={close}>
          Cancel
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            if (onSubmit) {
              onSubmit();
            }
            close();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
