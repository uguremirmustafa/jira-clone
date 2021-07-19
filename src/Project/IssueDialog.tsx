import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button } from '@material-ui/core';
import { Issues } from '../lib/generated/apolloComponents';

const useStyles = makeStyles({});

interface IProps {
  open: boolean;
  onClose: () => void;
  issue: string | undefined;
}

const IssueDialog: FC<IProps> = ({ open, onClose, issue }) => {
  const c = useStyles();

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{issue}</DialogTitle>
      <Button onClick={onClose}>close</Button>
    </Dialog>
  );
};
export default IssueDialog;
