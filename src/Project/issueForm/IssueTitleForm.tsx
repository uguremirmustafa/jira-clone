import { TextField, makeStyles, DialogActions, Typography, IconButton } from '@material-ui/core';
import { Check, Close, CloudUpload } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useUpdateIssueTitleMutation } from '../../lib/generated/apolloComponents';

interface IProps {
  value?: string;
  issueLoading: boolean;
  issueId: string;
}

const useStyles = makeStyles((theme) => ({
  form: {
    position: 'relative',
  },
  buttons: {
    position: 'absolute',
    right: 0,
    bottom: -25,
  },
  dirty: {
    border: '1px dashed yellow',
  },
}));

export const IssueTitleForm: FC<IProps> = ({ value, issueLoading, issueId }) => {
  const c = useStyles();
  const [updateIssueTitleMutation, { loading }] = useUpdateIssueTitleMutation();
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { isDirty, isSubmitting },
  } = useForm<{ title: string }>();

  // handle focus according to dirty fields
  const [fieldFocus, setFieldFocus] = useState(true);
  useEffect(() => {
    if (isDirty) {
      setFieldFocus(true);
    } else {
      setFieldFocus(false);
    }
  }, [isDirty]);

  // wait for issue loading and then reset the fields with loaded issues
  useEffect(() => {
    if (issueLoading) return;
    reset({ ...getValues(), title: value });
  }, [reset, value, getValues]);

  const onSubmit = async (formData: { title: string }) => {
    updateIssueTitleMutation({
      variables: { issueId, title: formData.title },
      // refetchQueries: [{ query: GetIssueById, variables: { issueId } }],
      // awaitRefetchQueries: true,
      // optimisticResponse: {
      //   __typename: 'mutation_root',
      //   update_issues_by_pk: {
      //     __typename: 'issues',
      //     id: issueId,
      //   },
      // },
      // update: (cache, { data: response }) => {
      //   try {
      //     const data = cache.readQuery<GetIssueByIdQuery>({
      //       query: GetIssueById,
      //       variables: { issueId },
      //     });
      //     if (!response?.update_issues_by_pk) return;
      //     if (data?.issues_by_pk?.title) {
      //       cache.writeQuery<GetIssueByIdQuery>({
      //         query: GetIssueById,
      //         variables: { issueId },
      //         data: {
      //           __typename: 'query_root',
      //           issues_by_pk: {
      //             __typename: 'issues',
      //             ...data.issues_by_pk,
      //             title: formData.title,
      //           },
      //         },
      //       });
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={c.form}>
      <Typography gutterBottom variant="subtitle2" color="secondary">
        Title
      </Typography>
      {issueLoading ? (
        <Skeleton height={60} />
      ) : (
        <Controller
          name="title"
          control={control}
          // defaultValue={value}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={isSubmitting}
              variant="filled"
              helperText={isDirty ? 'Click check button to apply changes!' : ''}
              fullWidth
              size="small"
              hiddenLabel
              color="secondary"
              InputProps={{
                disableUnderline: !fieldFocus,
              }}
            />
          )}
        />
      )}

      {fieldFocus && (
        <DialogActions className={c.buttons}>
          {!loading && (
            <IconButton
              size="small"
              onClick={() => {
                setFieldFocus(false);
                reset({ title: value });
              }}
            >
              <Close />
            </IconButton>
          )}
          <IconButton type="submit" color="secondary" size="small" disabled={loading}>
            {loading ? <CloudUpload /> : <Check />}
          </IconButton>
        </DialogActions>
      )}
    </form>
  );
};
