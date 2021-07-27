import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import {
  useAddUserToProjectMutation,
  useSearchUsersByEmailLazyQuery,
  AddUserToProjectMutationVariables,
} from '../lib/generated/apolloComponents';
import { Autocomplete } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useForm, Controller, NestedValue, UseFormReturn, UseFormSetValue } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { GetProjectById } from '../lib/graphql/project/queries/getProjectById';

const useStyles = makeStyles((theme) => {
  return {
    formControl: {
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

interface FormInput {
  email: {
    label: string;
    value: string;
  };
  type: string;
}
export interface IProps {
  projectId: string;
  handleClose: () => void;
}

const AddUserForm: FC<IProps> = ({ projectId, handleClose }) => {
  const c = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [searchUser, { loading, error, data }] = useSearchUsersByEmailLazyQuery({
    // fetchPolicy: 'network-only',
  });

  const [addUserVariables, setAddUserVariables] = useState<AddUserToProjectMutationVariables>();

  const [
    addUserToProjectMutation,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useAddUserToProjectMutation({
    variables: addUserVariables,
    refetchQueries: [{ query: GetProjectById, variables: { projectId } }],
  });

  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: { email: {}, type: process.env.REACT_APP_VIEWER_TYPE_ID },
  });

  const onSubmit = async (formData: FormInput) => {
    setAddUserVariables({
      userId: formData.email.value,
      typeId: formData.type,
      projectId,
    });
    try {
      const res = await addUserToProjectMutation();
      if (res.data?.insert_project_members_one?.id !== null) {
        enqueueSnackbar('Changes saved successfully', {
          variant: 'success',
        });
      } else if (res.data?.insert_project_members_one === null) {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={(props) => (
            <Autocomplete
              {...props}
              id="search-users"
              options={
                data ? data.search_users.map((user) => ({ label: user.email, value: user.id })) : []
              }
              getOptionLabel={(option) => option.label}
              getOptionSelected={(option, value) => {
                return option.value === value.value;
              }}
              onChange={(_, data) => props.field.onChange(data)}
              style={{ marginBottom: '1rem' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search users to add"
                  variant="filled"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  color="secondary"
                  onChange={(e) => searchUser({ variables: { email: e.target.value } })}
                />
              )}
            />
          )}
        />
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              variant="filled"
              color="secondary"
              className={c.formControl}
              // value={value}
              // onChange={onChange}
            >
              <MenuItem value={process.env.REACT_APP_MEMBER_TYPE_ID}>Member</MenuItem>
              <MenuItem value={process.env.REACT_APP_VIEWER_TYPE_ID}>Viewer</MenuItem>
            </Select>
          )}
        />
        <Button type="submit" className={c.submitBtn} variant="contained" color="secondary">
          {mutationLoading ? 'submitting' : 'submit'}
        </Button>
        <Button onClick={handleClose} className={c.submitBtn} variant="outlined">
          cancel
        </Button>
      </form>
    </>
  );
};

export default AddUserForm;
