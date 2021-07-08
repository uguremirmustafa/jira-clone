// material ui components
import { makeStyles, TextField, InputAdornment, IconButton } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
// react hook form
import { useForm, Controller, NestedValue, UseFormReturn, UseFormSetValue } from 'react-hook-form';
import React, { FC, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  UpdateColumnMutationVariables,
  useUpdateColumnMutation,
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
  id: string;
  name?: string;
  index: number;
}

const UpdateColumnForm: FC<IProps> = ({ projectId, name, id, index }) => {
  const c = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [variables, setVariables] = useState<UpdateColumnMutationVariables>();
  const [updateColumnMutation, { data, loading, error }] = useUpdateColumnMutation({
    variables,
    refetchQueries: [{ query: GetProjectById, variables: { id: projectId } }],
  });

  const { handleSubmit, control } = useForm<UpdateColumnMutationVariables>({
    defaultValues: {
      name,
      id,
      index,
    },
  });

  const onSubmit = async (formData: UpdateColumnMutationVariables) => {
    setVariables({ ...formData, index });
    try {
      enqueueSnackbar('Column updating, wait...', {
        variant: 'info',
      });
      const res = await updateColumnMutation();
      if (res.data?.update_columns_by_pk?.id !== null) {
        enqueueSnackbar('Column update successful', {
          variant: 'success',
        });
      } else if (res.data.update_columns_by_pk === null) {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            size="small"
            label="Column Title"
            className={c.input}
            color="secondary"
            placeholder={name}
          />
        )}
      />
    </form>
  );
};

export default UpdateColumnForm;
