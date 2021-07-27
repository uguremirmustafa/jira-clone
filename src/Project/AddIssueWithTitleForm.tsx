// material ui components
import { IconButton, InputAdornment, makeStyles, TextField } from '@material-ui/core';
// react hook form
import { useForm, Controller } from 'react-hook-form';
import { FC } from 'react';
import { CreateIssueWithTitleMutationVariables } from '../lib/generated/apolloComponents';
import { useAddIssueWithTitleAndNotify } from '../hooks/useAddIssueWithTitleAndNotify';
import { Send, SendOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => {
  return {
    form: {
      width: '100%',
      padding: theme.spacing(0, 0, 2, 0),
    },
    input: {
      background: theme.palette.grey[400],
      padding: theme.spacing(1, 2),
      borderRadius: theme.shape.borderRadius,
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

  const { handleSubmit, control } = useForm<CreateIssueWithTitleMutationVariables>({
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
              color="secondary"
              className={c.input}
              required
              InputProps={{
                disableUnderline: true,
                endAdornment: (
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
      </form>
    </>
  );
};

export default AddIssueWithTitleForm;
