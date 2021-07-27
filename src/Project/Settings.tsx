import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  GetProjectByIdQuery,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from '../lib/generated/apolloComponents';
import { FC, useEffect, useState } from 'react';
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useSnackbar } from 'notistack';
import MemberCard from './MemberCard';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      maxWidth: 550,
      // margin: 'auto',
    },

    form: {
      maxWidth: 550,
      marginTop: theme.spacing(4),
      margin: 'auto',
      // border: `1px solid ${theme.palette.primary.main}`,
      width: '100%',
    },
    inputBox: {
      marginBottom: theme.spacing(3),
    },
    input: {
      width: '100%',
    },
  };
});

interface IFormInput {
  title: string;
  description: string;
}

interface IProps {
  project: GetProjectByIdQuery | undefined;
  projectId: string;
  isOwner: boolean;
  loading: boolean;
}

const Settings: FC<IProps> = ({ projectId, isOwner, loading, project }) => {
  const { enqueueSnackbar } = useSnackbar();
  const c = useStyles();

  let defaultValues = {
    title: 'title',
    description: 'description',
  };

  const [variables, setVariables] = useState({
    projectId,
    title: '',
    description: '',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<IFormInput>({ defaultValues });

  const [updateProjectMutation] = useUpdateProjectMutation({ variables });

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    setVariables({ ...formData, projectId });
    const res = await updateProjectMutation();

    if (res.data?.update_projects_by_pk !== null) {
      enqueueSnackbar('Changes saved successfully', {
        variant: 'success',
      });
    } else if (res.errors || res.data?.update_projects_by_pk === null) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  useEffect(() => {
    reset({
      description: project?.projects_by_pk?.description || '',
      title: project?.projects_by_pk?.title || '',
    });
  }, [project, reset]);

  return (
    <Box className={c.root}>
      <Typography variant="h4" component="h2" color="textSecondary" style={{ margin: '2rem 0' }}>
        Project Details
      </Typography>
      {isOwner ? (
        <form onSubmit={handleSubmit(onSubmit)} className={c.form}>
          <Box className={c.inputBox}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  label="Project Title"
                  className={c.input}
                  color="secondary"
                  helperText="What is the name of the project?"
                  required
                />
              )}
            />
          </Box>
          <Box className={c.inputBox}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="filled"
                  label="Project Description"
                  className={c.input}
                  color="secondary"
                  helperText="Describe the main focus of the project"
                />
              )}
            />
          </Box>
          {isDirty && (
            <Button type="submit" variant="contained" color="secondary" fullWidth>
              {isSubmitting ? 'loading' : 'save changes'}
            </Button>
          )}
        </form>
      ) : (
        <Box>
          <Typography variant="subtitle1" color="textSecondary">
            Title:
          </Typography>
          <Typography variant="subtitle1" color="secondary">
            {loading ? <Skeleton /> : project?.projects_by_pk?.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Description:
          </Typography>
          <Typography>{loading ? <Skeleton /> : project?.projects_by_pk?.description}</Typography>
        </Box>
      )}
      <Box>
        <Typography variant="h4" component="h3" style={{ margin: '2rem 0' }} color="textSecondary">
          {project?.projects_by_pk?.project_members[0] !== undefined
            ? 'Project Members'
            : 'Currently there is nobody in the project'}
        </Typography>
        {project?.projects_by_pk?.project_members.map((i) => (
          <MemberCard
            member={i}
            id={projectId}
            key={i.id}
            ownerId={project?.projects_by_pk?.owner_id}
          />
        ))}
      </Box>
    </Box>
  );
};
export default Settings;
