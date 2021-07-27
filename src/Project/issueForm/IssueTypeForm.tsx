// material ui
import {
  makeStyles,
  DialogActions,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { Check, Close, CloudUpload } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  GetIssueByIdQuery,
  useUpdateIssueTypeMutation,
} from '../../lib/generated/apolloComponents';
import { GetIssueById } from '../../lib/graphql/issue/queries/GetIssueById';

interface IProps {
  value: string | undefined;
  issueLoading: boolean;
  issueId: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(8),
  },
  form: {
    position: 'relative',
  },
  leftColumn: {
    paddingRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  menuItem: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  buttons: {
    position: 'absolute',
    right: 0,
    bottom: -25,
  },
}));

export const IssueTypeForm: FC<IProps> = ({ value, issueLoading, issueId }) => {
  const c = useStyles();
  const [fieldFocus, setFieldFocus] = useState(false);

  const [updateIssueTypeMutation, { loading }] = useUpdateIssueTypeMutation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<{ type: string }>({
    defaultValues: {
      type: value,
    },
  });

  // handle focus according to dirty fields
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
    reset({ type: value });
  }, [reset, value, issueId]);

  const onSubmit = async (formData: { type: string }) => {
    try {
      updateIssueTypeMutation({
        variables: { issueId, type: formData.type },

        optimisticResponse: {
          __typename: 'mutation_root',
          update_issues_by_pk: {
            __typename: 'issues',
            id: issueId,
            type: formData.type,
          },
        },
        update: (cache, { data: response }) => {
          try {
            const data = cache.readQuery<GetIssueByIdQuery>({
              query: GetIssueById,
              variables: { issueId },
            });
            if (!response?.update_issues_by_pk) return;
            if (data?.issues_by_pk?.title) {
              cache.writeQuery<GetIssueByIdQuery>({
                query: GetIssueById,
                variables: { issueId },
                data: {
                  __typename: 'query_root',
                  issues_by_pk: {
                    __typename: 'issues',
                    ...data.issues_by_pk,
                    type: formData.type,
                  },
                },
              });
            }
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={c.form}>
      {issueLoading ? (
        <Skeleton height={60} />
      ) : (
        <>
          <Typography gutterBottom variant="subtitle2" color="secondary">
            Type
          </Typography>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <Select
                  {...field}
                  defaultValue={value}
                  disabled={isSubmitting}
                  variant="filled"
                  SelectDisplayProps={{
                    style: {
                      display: 'flex',
                      gap: '1rem',
                      padding: '.6rem',
                      borderRadius: '0.2rem',
                    },
                  }}
                  disableUnderline
                >
                  {[
                    { value: 'enhancement', label: 'Enhancement' },
                    { value: 'good-first-issue', label: 'Good first issue' },
                    { value: 'bug', label: 'Bug' },
                    { value: 'documentation', label: 'Documentation' },
                    { value: 'error', label: 'Error' },
                  ].map((item) => (
                    <MenuItem value={item.value} className={c.menuItem}>
                      <Typography>{item.label}</Typography>
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {isDirty ? 'Click check button to apply changes!' : ''}
                </FormHelperText>
              </FormControl>
            )}
          />
        </>
      )}
      {fieldFocus && (
        <DialogActions className={c.buttons}>
          {!loading && (
            <IconButton
              size="small"
              onClick={() => {
                setFieldFocus(false);
                reset({ type: value });
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
