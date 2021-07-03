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
}

const AddColumnForm: FC<IProps> = ({ projectId, name }) => {
  const c = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [variables, setVariables] = useState<CreateColumnMutationVariables>();
  const [createColumnMutation, { data, loading, error }] = useCreateColumnMutation({
    variables,
    refetchQueries: [{ query: GetProjectById, variables: { id: projectId } }],
  });

  const { handleSubmit, control } = useForm<CreateColumnMutationVariables>({
    defaultValues: {
      name,
      projectId,
    },
  });

  const onSubmit = async (formData: CreateColumnMutationVariables) => {
    alert(JSON.stringify(formData, null, 2));
    setVariables(formData);
    // try {
    //   enqueueSnackbar('Issue is submitting, wait...', {
    //     variant: 'info',
    //   });
    //   const res = await createColumnMutation();
    //   if (res.data?.insert_columns_one?.id !== null) {
    //     enqueueSnackbar('Issue created successfully', {
    //       variant: 'success',
    //     });
    //   } else if (res.data.insert_columns_one === null) {
    //     enqueueSnackbar('Something went wrong', { variant: 'error' });
    //   } else if (res.errors) {
    //     enqueueSnackbar(`${res.errors[0].message}`, { variant: 'error' });
    //   }
    // } catch (error) {
    //   enqueueSnackbar(`${error.message}`, {
    //     variant: 'warning',
    //   });
    // }
  };

  const [mouseEnter, setMouseEnter] = useState(false);
  const handleMouseEnter = () => {
    setMouseEnter(true);
  };
  const handleMouseLeave = () => {
    setMouseEnter(false);
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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            value={name}
            InputProps={{
              endAdornment: mouseEnter ? (
                <InputAdornment position="end">
                  <IconButton>
                    <Edit />
                  </IconButton>
                </InputAdornment>
              ) : (
                ''
              ),
            }}
          />
        )}
      />
      {/* <Button
        type="submit"
        className={c.submitBtn}
        variant="contained"
        color="secondary"
        disabled={loading}
      >
        {loading ? 'submitting' : 'submit'}
      </Button> */}
    </form>
  );
};

export default AddColumnForm;
