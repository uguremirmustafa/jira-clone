// material ui components
import { makeStyles, TextField } from '@material-ui/core';
// react hook form
import { useForm, Controller } from 'react-hook-form';
import { FC, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  CreateIssueWithTitleMutationVariables,
  useCreateIssueWithTitleMutation,
} from '../lib/generated/apolloComponents';
import { GetProjectIssuesByProjectId } from '../lib/graphql/project/queries/getProjectIssuesByProjectId';
import { useAddIssueWithTitleAndNotify } from '../hooks/useAddIssueWithTitleAndNotify';

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

  // const [variables, setVariables] = useState<CreateIssueWithTitleMutationVariables>();

  const { handleSubmit, control, reset } = useForm<CreateIssueWithTitleMutationVariables>({
    defaultValues: {
      title: '',
    },
  });

  const addIssue = useAddIssueWithTitleAndNotify();
  const onSubmit = async (formData: CreateIssueWithTitleMutationVariables) => {
    addIssue({ ...formData, index: indexOfLastIssue, projectId, columnId }, projectId);
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
