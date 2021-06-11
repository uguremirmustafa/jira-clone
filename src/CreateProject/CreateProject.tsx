import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useCreateProjectMutation } from '../lib/generated/apolloComponents';
import { FC, useState } from 'react';
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { GetProjectsQuery } from '../lib/graphql/project/queries/getProjects';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      maxWidth: 550,
      margin: 'auto',
      paddingTop: theme.spacing(4),
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

export const CreateProject: FC = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const c = useStyles();

  const [variables, setVariables] = useState<IFormInput>({ description: '', title: '' });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IFormInput>();

  const [createProjectMutation] = useCreateProjectMutation({ variables });

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    setVariables(formData);
    const res = await createProjectMutation({
      // TODO: update the cache manually for saving a network request
      refetchQueries: [{ query: GetProjectsQuery }],
    });

    if (res.data) {
      enqueueSnackbar('Project is created successfully', {
        variant: 'success',
      });
      enqueueSnackbar('Redirecting to the project', {
        variant: 'success',
      });
      let projectId = res.data.insert_projects_one?.id;
      setTimeout(() => {
        history.push(`/project/${projectId}/board`);
      }, 1000);
    } else if (res.errors) {
      enqueueSnackbar(res.errors[0].message, { variant: 'error' });
    }
  };

  return (
    <Box className={c.root}>
      <Typography variant="h4" component="h2">
        Create A New Project
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
          {isSubmitting ? 'loading' : 'create the project'}
        </Button>
      </form>
    </Box>
  );
};
