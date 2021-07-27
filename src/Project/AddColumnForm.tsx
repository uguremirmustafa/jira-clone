// material ui components
import { Box, Grid, IconButton, makeStyles, TextField, Tooltip } from '@material-ui/core';
// react hook form
import { useForm, Controller } from 'react-hook-form';
import { FC, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  CreateColumnMutationVariables,
  GetProjectByIdQuery,
  useCreateColumnMutation,
} from '../lib/generated/apolloComponents';
import { GetProjectById } from '../lib/graphql/project/queries/getProjectById';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { useRef } from 'react';
export interface IProps {
  projectId: string;
  name?: string;
  indexOfLastColumn: number;
}

const useStyles = makeStyles((theme) => {
  return {
    column: {
      backgroundColor: theme.palette.grey[200],
      borderRadius: '8px',
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      width: '100%',
      maxWidth: '280px',
      minWidth: '200px',
      height: '100%',
      transition: 'all 2s ease',
    },
  };
});

const AddColumnForm: FC<IProps> = ({ projectId, name, indexOfLastColumn }) => {
  const c = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  // toggle adding
  const [adding, setAdding] = useState(false);
  const [createColumnMutation] = useCreateColumnMutation();

  const { handleSubmit, control, reset } = useForm<CreateColumnMutationVariables>({
    defaultValues: {
      name,
      projectId,
    },
  });

  const onSubmit = async (formData: CreateColumnMutationVariables) => {
    reset();
    try {
      enqueueSnackbar('Creating column on database, wait...', {
        variant: 'info',
      });
      const res = await createColumnMutation({
        variables: { ...formData, index: indexOfLastColumn + 1 },
        refetchQueries: [{ query: GetProjectById, variables: { projectId } }],
        awaitRefetchQueries: true,
        optimisticResponse: {
          __typename: 'mutation_root',
          insert_columns_one: {
            __typename: 'columns',
            id: Math.round(Math.random() * -1000000),
            index: indexOfLastColumn + 1,
            name: formData.name,
          },
        },
        update: async (cache, { data: response }) => {
          const data = await cache.readQuery<GetProjectByIdQuery>({
            query: GetProjectById,
            variables: { projectId },
          });
          if (!response?.insert_columns_one) return;
          if (typeof response.insert_columns_one.id === 'string') return;
          if (data?.projects_by_pk?.columns) {
            cache.writeQuery<GetProjectByIdQuery>({
              query: GetProjectById,
              variables: { projectId },
              data: {
                __typename: 'query_root',
                projects_by_pk: {
                  ...data.projects_by_pk,
                  columns: [...data.projects_by_pk.columns, response?.insert_columns_one],
                },
              },
            });
          }
        },
      });

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
      reset();
      enqueueSnackbar(`${error.message}`, {
        variant: 'warning',
      });
    }
  };

  return (
    <>
      {adding && (
        <Grid item className={c.column}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  // inputRef={ref}
                  autoFocus
                  size="small"
                  label="Add Column +"
                  color="secondary"
                  value={name}
                  onBlur={() => setAdding(false)}
                  InputProps={{ disableUnderline: false }}
                />
              )}
            />
          </form>
        </Grid>
      )}
      <Grid item>
        <Tooltip title={adding ? 'cancel' : 'click to add a new column'} placement="top">
          <IconButton color="secondary" onClick={() => setAdding(!adding)}>
            {!adding ? <AddCircleOutlinedIcon /> : <CancelOutlinedIcon />}
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  );
};

export default AddColumnForm;
