import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from '../lib/generated/apolloComponents';
import { FC, useEffect, useState } from 'react';
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      maxWidth: 550,
      margin: 'auto',
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
      width: '100%',
    },
  };
});

interface IFormInput {
  title: string;
  description: string;
}

interface IProps {
  id: string;
}

const Settings: FC<IProps> = ({ id }) => {
  const c = useStyles();
  const { data, loading, error } = useGetProjectByIdQuery({ variables: { id } });

  let defaultValues = {
    title: 'title',
    description: 'description',
  };

  const [variables, setVariables] = useState({
    id,
    title: '',
    description: '',
  });

  const { control, handleSubmit, reset } = useForm<IFormInput>({ defaultValues });
  const [
    updateProjectMutation,
    { data: updatedProject, loading: updatedLoading, error: updatedError },
  ] = useUpdateProjectMutation({ variables });

  const onSubmit: SubmitHandler<IFormInput> = (formData) => {
    setVariables({ ...formData, id });
    updateProjectMutation();
  };

  useEffect(() => {
    reset({
      description: data?.projects_by_pk?.description || '',
      title: data?.projects_by_pk?.title || '',
    });
  }, [data, reset]);

  if (loading) {
    return (
      <Box className={c.root}>
        <Skeleton animation="wave" width={180} height={80} />
        <Skeleton animation="wave" height={70} />
        <Skeleton animation="wave" height={70} />
        <Skeleton animation="wave" width={140} height={50} />
      </Box>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Box className={c.root}>
      <Typography variant="h4" component="h2">
        Project Details
      </Typography>
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

        <Button type="submit" variant="contained" color="secondary">
          {updatedLoading ? 'loading' : 'save changes'}
        </Button>
        {updatedError && (
          <Box>
            <Typography>(updatedError.message)</Typography>
          </Box>
        )}
        {updatedProject && (
          <Box>
            <Typography>Changes Saved</Typography>
          </Box>
        )}
      </form>
    </Box>
  );
};
export default Settings;
