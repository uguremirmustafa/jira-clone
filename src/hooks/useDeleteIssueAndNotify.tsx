import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useDeleteIssueMutation } from '../lib/generated/apolloComponents';

export const useDeleteIssueAndNotify = (issueId: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const [success, setSuccess] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteIssueMutation] = useDeleteIssueMutation();
  const deleteIssue = async () => {
    setDeleting(true);
    try {
      const res = await deleteIssueMutation({ variables: { issueId } });
      if (res.data?.delete_issues_by_pk?.id) {
        enqueueSnackbar('Success, redirecting to kanban board!', { variant: 'success' });
        setSuccess(true);
      } else if (res.data?.delete_issues_by_pk === null) {
        enqueueSnackbar('Something went wrong while deleting the issue', { variant: 'error' });
        setSuccess(false);
      } else if (res.errors) {
        enqueueSnackbar(`${res.errors[0].message}`, { variant: 'error' });
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
    setDeleting(false);
  };

  return { deleteIssue, success, deleting };
};
