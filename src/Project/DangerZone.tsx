import { Button } from '@material-ui/core';
import React, { FC } from 'react';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { useDeleteProjectMutation } from '../lib/generated/apolloComponents';
import { useSnackbar } from 'notistack';
import { GetProjects } from '../lib/graphql/project/queries/getProjects';
import { useHistory } from 'react-router';

interface IProps {
  id: string;
}

const DangerZone: FC<IProps> = ({ id }) => {
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  const [deleteProjectMutation] = useDeleteProjectMutation({ variables: { id } });
  const handleDeleteProject = async () => {
    const res = await deleteProjectMutation({
      // TODO: update the cache manually for saving a network request
      refetchQueries: [{ query: GetProjects }],
    });
    let returnedTitle = res.data?.delete_projects_by_pk?.title || '';
    if (returnedTitle !== '') {
      enqueueSnackbar(`Project named "${returnedTitle}" has deleted successfully`, {
        variant: 'success',
        autoHideDuration: 2000,
      });
      enqueueSnackbar('Redirecting...', {
        variant: 'success',
        autoHideDuration: 2500,
      });
      setTimeout(() => {
        history.push(`/`);
      }, 1000);
    } else if (res.data?.delete_projects_by_pk === null) {
      enqueueSnackbar(`There is no such a project`, { variant: 'error' });
    } else if (res.errors) {
      enqueueSnackbar(res.errors[0].message, { variant: 'error' });
    }
  };

  return (
    <div>
      <Button
        onClick={handleDeleteProject}
        variant="outlined"
        color="secondary"
        startIcon={<DeleteForeverRoundedIcon />}
      >
        Delete Project
      </Button>
    </div>
  );
};

export default DangerZone;
