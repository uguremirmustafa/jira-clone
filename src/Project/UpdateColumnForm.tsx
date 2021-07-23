// material ui components
import { Divider, IconButton, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
// react hook form
import { useForm, Controller } from 'react-hook-form';
import React, { FC, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  UpdateColumnMutationVariables,
  useUpdateColumnMutation,
} from '../lib/generated/apolloComponents';
import { GetProjectById } from '../lib/graphql/project/queries/getProjectById';
import { Send } from '@material-ui/icons';

const useStyles = makeStyles((theme) => {
  return {
    title: {
      width: '100%',
      padding: theme.spacing(2, 0),
    },
    input: {
      padding: theme.spacing(0, 0),
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
  const [updateColumnMutation] = useUpdateColumnMutation({
    variables,
    // refetchQueries: [{ query: GetProjectById, variables: { id: projectId } }],
    // update:(cache,{data:{}})
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
  const [active, setActive] = useState(false);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onFocus={() => setActive(true)}
            size="small"
            label={active ? 'Edit column title' : '  '}
            color="secondary"
            placeholder={name}
            className={c.input}
            InputProps={{
              disableUnderline: !active,
              endAdornment: active && (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <Send fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Divider />
    </form>
  );
};

export default UpdateColumnForm;
