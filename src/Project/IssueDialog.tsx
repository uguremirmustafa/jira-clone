import { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {
  Box,
  Button,
  DialogContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  SubscribeIssueByIdDocument,
  useGetIssueByIdQuery,
} from '../lib/generated/apolloComponents';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import { Close } from '@material-ui/icons';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import LockIcon from '@material-ui/icons/Lock';
import { IssueForm } from './issueForm/IssueForm';
import { MenuButton } from '../shared/MenuButton';
import { confirmDialog } from '../shared/ConfirmDialog';
import { useDeleteIssueAndNotify } from '../hooks/useDeleteIssueAndNotify';
import LoadSpinner from '../shared/Loader';
import { NotImplementedItem } from '../shared/NotImplementedItem';

const useStyles = makeStyles((theme) => {
  return {
    topScrollPaper: {
      alignItems: 'flex-start',
      marginTop: theme.spacing(4),
      maxHeight: '95%',
    },
    topPaperScrollBody: {
      verticalAlign: 'top',
    },
  };
});

interface IProps extends RouteComponentProps<{ issueId: string }> {
  isOwnerOrMember: boolean;
}

const IssueDialog: FC<IProps> = ({ match, history, isOwnerOrMember }) => {
  const c = useStyles();
  let issueId = match.params.issueId;
  const {
    data: issue,
    loading: issueLoading,
    error: issueError,
    subscribeToMore,
  } = useGetIssueByIdQuery({
    variables: { issueId },
  });

  subscribeToMore({
    document: SubscribeIssueByIdDocument,
    variables: { issueId },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newIssuesData = subscriptionData.data.issues_by_pk;

      return Object.assign({}, prev, {
        __typename: prev.__typename,
        issues_by_pk: newIssuesData,
      });
    },
  });

  // modal state
  const [open, setOpen] = useState(true);
  const onClose = () => {
    history.goBack();
    setOpen(false);
  };

  // delete issue
  const { deleteIssue, success, deleting } = useDeleteIssueAndNotify(issueId);
  if (success) {
    history.push(`/project/${issue?.issues_by_pk?.project_id}/board`);
  }

  if (issueError) {
    return <div>{issueError.message}</div>;
  }
  return (
    <Dialog
      transitionDuration={0}
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="lg"
      classes={{
        scrollPaper: c.topScrollPaper,
        paperScrollBody: c.topPaperScrollBody,
      }}
    >
      {deleting ? (
        <Box display="flex" width="100%" height="600px" justifyContent="center" alignItems="center">
          <LoadSpinner />
        </Box>
      ) : (
        <>
          <DialogTitle>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box flexGrow="1">
                {issueLoading ? (
                  <Skeleton />
                ) : (
                  <Typography variant="h5" component="h3">
                    {issue?.issues_by_pk?.title}
                  </Typography>
                )}
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <NotImplementedItem>
                  <IconButton>
                    <LockIcon />
                  </IconButton>
                </NotImplementedItem>
                <NotImplementedItem>
                  <IconButton>
                    <ThumbUpIcon />
                  </IconButton>
                </NotImplementedItem>
                <NotImplementedItem>
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </NotImplementedItem>
                <MenuButton
                  icon={<MoreHorizIcon />}
                  items={[
                    isOwnerOrMember && {
                      text: `Delete Issue`,
                      func: () => {
                        confirmDialog(
                          'Are you sure you want to delete the issue and its comments? This is not reversable.',
                          () => deleteIssue()
                        );
                      },
                    },
                  ]}
                />
                <IconButton onClick={onClose}>
                  <Close />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent>
            <IssueForm
              issue={issue}
              issueLoading={issueLoading}
              issueId={issueId}
              isOwnerOrMember={isOwnerOrMember}
            />
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default withRouter(IssueDialog);
