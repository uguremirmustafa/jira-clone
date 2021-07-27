// material ui
import {
  makeStyles,
  DialogActions,
  Typography,
  IconButton,
  Select,
  MenuItem,
  ListItemIcon,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { Check, Close, CloudUpload } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import {
  GetIssueByIdQuery,
  useUpdateIssuePriorityMutation,
} from '../../lib/generated/apolloComponents';
import { GetIssueById } from '../../lib/graphql/issue/queries/GetIssueById';
import { priorityValues } from '../../shared/FieldForNonMembers';

interface IProps {
  value?: number;
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

export const IssuePriorityForm: FC<IProps> = ({ value, issueLoading, issueId }) => {
  const c = useStyles();
  const [fieldFocus, setFieldFocus] = useState(false);

  const [updateIssuePriorityMutation, { loading }] = useUpdateIssuePriorityMutation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<{ priority: number }>({
    defaultValues: {
      priority: value,
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
    reset({ priority: value });
  }, [reset, value, issueId]);

  const onSubmit = async (formData: { priority: number }) => {
    try {
      updateIssuePriorityMutation({
        variables: { issueId, priority: formData.priority },
        optimisticResponse: {
          __typename: 'mutation_root',
          update_issues_by_pk: {
            __typename: 'issues',
            id: issueId,
            priority: formData.priority,
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
                    priority: formData.priority,
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
            Priority
          </Typography>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <Select
                  {...field}
                  defaultValue={value}
                  disabled={isSubmitting}
                  SelectDisplayProps={{
                    style: {
                      display: 'flex',
                      gap: '1rem',
                      padding: '.6rem',
                      borderRadius: '0.2rem',
                    },
                  }}
                >
                  {priorityValues.map((item) => (
                    <MenuItem value={item.value} className={c.menuItem}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
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
                reset({ priority: value });
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
