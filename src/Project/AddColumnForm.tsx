// material ui components
import { makeStyles, TextField, InputAdornment, IconButton } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
// react hook form
import { useForm, Controller, NestedValue, UseFormReturn, UseFormSetValue } from 'react-hook-form';
import React, { FC, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  CreateColumnMutationVariables,
  useCreateColumnMutation,
} from '../lib/generated/apolloComponents';
import { GetProjectById } from '../lib/graphql/project/queries/getProjectById';

const useStyles = makeStyles((theme) => {
  return {
    input: {
      // width: '100%',
    },
  };
});

export interface IProps {
  projectId: string;
  name?: string;
  numOfColumns?: number;
}

const AddColumnForm: FC<IProps> = ({ projectId, name, numOfColumns }) => {
  const c = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [variables, setVariables] = useState<CreateColumnMutationVariables>();
  const [createColumnMutation, { data, loading, error }] = useCreateColumnMutation({
    variables,
    refetchQueries: [{ query: GetProjectById, variables: { id: projectId } }],
  });

  const { handleSubmit, control, reset } = useForm<CreateColumnMutationVariables>({
    defaultValues: {
      name,
      projectId,
    },
  });

  const onSubmit = async (formData: CreateColumnMutationVariables) => {
    setVariables({ ...formData, index: numOfColumns || 0 });
    try {
      enqueueSnackbar('Creating column on database, wait...', {
        variant: 'info',
      });
      const res = await createColumnMutation();
      if (res.data?.insert_columns_one?.id !== null) {
        enqueueSnackbar('Column created successfully', {
          variant: 'success',
        });
      } else if (res.data.insert_columns_one === null) {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      } else if (res.errors) {
        enqueueSnackbar(`${res.errors[0].message}`, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}`, {
        variant: 'warning',
      });
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            size="small"
            label="Add Column +"
            className={c.input}
            color="secondary"
            value={name}
          />
        )}
      />
    </form>
  );
};

export default AddColumnForm;
