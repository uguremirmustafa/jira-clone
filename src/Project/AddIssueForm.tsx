// material ui components
import {
  Button,
  makeStyles,
  Box,
  TextField,
  FormHelperText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
// react hook form
import { useForm, Controller, NestedValue, UseFormReturn, UseFormSetValue } from 'react-hook-form';
import React, { FC, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  CreateIssueMutationVariables,
  useCreateIssueMutation,
} from '../lib/generated/apolloComponents';
import { GetProjectById } from '../lib/graphql/project/queries/getProjectById';

const useStyles = makeStyles((theme) => {
  return {
    form: {
      maxWidth: 550,
      marginTop: theme.spacing(4),
      margin: 'auto',
      border: `1px solid ${theme.palette.primary.main}`,
      width: '100%',
    },
    formControl: {
      width: '100%',
    },
    inputBox: {
      marginBottom: theme.spacing(3),
    },
    input: {
      width: '100%',
    },
    submitBtn: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(2),
      float: 'right',
    },
  };
});

export interface IProps {
  projectId: string;
  handleClose: () => void;
}

const AddIssueForm: FC<IProps> = ({ projectId, handleClose }) => {
  const c = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [variables, setVariables] = useState<CreateIssueMutationVariables>();
  const [createIssueMutation, { data, loading, error }] = useCreateIssueMutation({
    variables,
    refetchQueries: [{ query: GetProjectById, variables: { id: projectId } }],
  });

  const { handleSubmit, control } = useForm<CreateIssueMutationVariables>({
    defaultValues: {
      title: '',
      description: '',
      type: 'enhancement',
      // status: 'todo',
      projectId,
      priority: 3,
    },
  });

  const onSubmit = async (formData: CreateIssueMutationVariables) => {
    // alert(JSON.stringify(formData, null, 2));
    setVariables(formData);
    try {
      enqueueSnackbar('Issue is submitting, wait...', {
        variant: 'info',
      });
      const res = await createIssueMutation();
      if (res.data?.insert_issues_one?.id !== null) {
        enqueueSnackbar('Issue created successfully', {
          variant: 'success',
        });
      } else if (res.data.insert_issues_one === null) {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      } else if (res.errors) {
        enqueueSnackbar(`${res.errors[0].message}`, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}`, {
        variant: 'warning',
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={c.form}>
        <Box className={c.inputBox}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                size="small"
                label="Issue Title"
                className={c.input}
                color="secondary"
                helperText="Short summary of the issue. This will be on kanban board."
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
                variant="outlined"
                size="small"
                label="Issue Description"
                className={c.input}
                color="secondary"
                helperText="Short summary of the issue. This will be on kanban board."
                required
              />
            )}
          />
        </Box>
        <Box className={c.inputBox}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormControl className={c.input} size="small" required>
                <InputLabel id="type">Issue Type</InputLabel>
                <Select
                  {...field}
                  variant="outlined"
                  label="Issue Type"
                  color="secondary"
                  labelId="type"
                  id="type"
                  placeholder="Issue type"
                >
                  <MenuItem value="bug">Bug</MenuItem>
                  <MenuItem value="enhancement">Enhancement</MenuItem>
                  <MenuItem value="good-first-issue">Good first issue</MenuItem>
                  <MenuItem value="styling">Styling</MenuItem>
                  <MenuItem value="docs">Documentation</MenuItem>
                  <MenuItem value="feature">Feature</MenuItem>
                </Select>
                <FormHelperText>Select your issue type.</FormHelperText>
              </FormControl>
            )}
          />
        </Box>
        {/* <Box className={c.inputBox}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl className={c.input} size="small" required>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  {...field}
                  variant="outlined"
                  label="Issue status"
                  color="secondary"
                  labelId="status"
                  id="status"
                  placeholder="Issue status"
                >
                  <MenuItem value="backlog">Backlog</MenuItem>
                  <MenuItem value="todo">Todo</MenuItem>
                  <MenuItem value="in-progress">In-progress</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </Select>
                <FormHelperText>Select your issue status.</FormHelperText>
              </FormControl>
            )}
          />
        </Box> */}
        <Box className={c.inputBox}>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <FormControl className={c.input} size="small" required>
                <InputLabel id="priority">Priority</InputLabel>
                <Select
                  {...field}
                  variant="outlined"
                  label="Issue status"
                  color="secondary"
                  labelId="priority"
                  id="priority"
                  placeholder="Issue priority"
                >
                  <MenuItem value={1}>Lowest</MenuItem>
                  <MenuItem value={2}>Low</MenuItem>
                  <MenuItem value={3}>Medium</MenuItem>
                  <MenuItem value={4}>High</MenuItem>
                  <MenuItem value={5}>Highest</MenuItem>
                </Select>
                <FormHelperText>Select your issue priority.</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        <Button
          type="submit"
          className={c.submitBtn}
          variant="contained"
          color="secondary"
          disabled={loading}
        >
          {loading ? 'submitting' : 'submit'}
        </Button>
        <Button onClick={handleClose} className={c.submitBtn} variant="outlined">
          cancel
        </Button>
      </form>
    </>
  );
};

export default AddIssueForm;
