// material ui components
import { makeStyles, TextField } from '@material-ui/core';
// react hook form
import { useForm, Controller } from 'react-hook-form';
import { FC } from 'react';
import { useSnackbar } from 'notistack';
import {
  CreateIssueWithTitleMutationVariables,
  useCreateIssueWithTitleMutation,
} from '../lib/generated/apolloComponents';
import { GetProjectIssuesByProjectId } from '../lib/graphql/project/queries/getProjectIssuesByProjectId';

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
  const [createIssueWithTitleMutation] = useCreateIssueWithTitleMutation();
  const { handleSubmit, control, reset } = useForm<CreateIssueWithTitleMutationVariables>({
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (formData: CreateIssueWithTitleMutationVariables) => {
    reset();
    try {
      enqueueSnackbar('Issue is submitting, wait...', {
        variant: 'info',
      });
      const res = await createIssueWithTitleMutation({
        variables: { ...formData, index: indexOfLastIssue, projectId, columnId },
        refetchQueries: [{ query: GetProjectIssuesByProjectId, variables: { projectId } }],
      });
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
      reset();
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
