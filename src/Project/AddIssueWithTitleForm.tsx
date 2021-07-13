// material ui components
import { Button, makeStyles, Box, TextField } from '@material-ui/core';
// react hook form
import { useForm, Controller } from 'react-hook-form';
import React, { FC, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  CreateIssueWithTitleMutationVariables,
  useCreateIssueWithTitleMutation,
} from '../lib/generated/apolloComponents';
import { GetProjectById } from '../lib/graphql/project/queries/getProjectById';

const useStyles = makeStyles((theme) => {
  return {
    form: {
      width: '100%',
      padding: theme.spacing(0, 0, 2, 0),
    },
    input: {
      background: theme.palette.primary.dark,
      padding: theme.spacing(1),
      borderRadius: '.2rem',
    },
  };
});

export interface IProps {
  projectId: string;
  columnId: string;
  indexOfLastIssue: number;
}

const AddIssueWithTitleForm: FC<IProps> = ({ projectId, columnId, indexOfLastIssue }) => {
  const c = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [variables, setVariables] = useState<CreateIssueWithTitleMutationVariables>();
  const [createIssueWithTitleMutation, { data, loading, error }] = useCreateIssueWithTitleMutation({
    variables,
    refetchQueries: [{ query: GetProjectById, variables: { id: projectId } }],
  });

  const { handleSubmit, control } = useForm<CreateIssueWithTitleMutationVariables>({
    defaultValues: {
      title: '',
      projectId,
      columnId,
    },
  });

  const onSubmit = async (formData: CreateIssueWithTitleMutationVariables) => {
    setVariables({ ...formData, index: indexOfLastIssue });
    try {
      enqueueSnackbar('Issue is submitting, wait...', {
        variant: 'info',
      });
      const res = await createIssueWithTitleMutation();
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
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              placeholder="new issue here"
              className={c.input}
              color="secondary"
              required
              InputProps={{ disableUnderline: true }}
            />
          )}
        />
      </form>
    </>
  );
};

export default AddIssueWithTitleForm;
