import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
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
  const { enqueueSnackbar } = useSnackbar();
  const c = useStyles();

  const { data, loading, error } = useGetProjectByIdQuery({
    variables: { id },
  });

  let defaultValues = {
    title: 'title',
    description: 'description',
  };

  const [variables, setVariables] = useState({
    id,
    title: '',
    description: '',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IFormInput>({ defaultValues });

  const [updateProjectMutation] = useUpdateProjectMutation({ variables });

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    setVariables({ ...formData, id });
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
        <Skeleton animation="wave" width={180} height={80} />
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
          {isSubmitting ? 'loading' : 'save changes'}
        </Button>
      </form>
      <Box>
        <Typography variant="h4" component="h3" style={{ margin: '2rem 0' }}>
          {data?.projects_by_pk?.project_members[0] !== undefined
            ? 'Project Members'
            : 'Currently there is nobody in the project'}
        </Typography>

        {data?.projects_by_pk?.project_members.map((i) => (
          <MemberCard member={i} id={id} key={i.id} />
        ))}
      </Box>
    </Box>
  );
};
export default Settings;
