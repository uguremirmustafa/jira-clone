import {
  makeStyles,
  DialogActions,
  Typography,
  IconButton,
  TextField,
  Box,
  Chip,
  CircularProgress,
} from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { Add, Cancel, Check, Close, CloudUpload, Delete } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Labels,
  useAddLabelToIssueMutation,
  useConnectExistingLabelToIssueMutation,
  useDeleteIssueLabelMutation,
  useGetLabelsLazyQuery,
  useGetLabelsQuery,
  useUpdateIssueTitleMutation,
} from '../../lib/generated/apolloComponents';
import { useSnackbar } from 'notistack';
import { confirmDialog } from '../../shared/ConfirmDialog';

interface IProps {
  value:
    | {
        id: any;
        name: string;
      }[]
    | undefined;
  issueLoading: boolean;
  issueId: string;
  isOwnerOrMember: boolean;
}

const useStyles = makeStyles((theme) => ({
  form: {
    position: 'relative',
  },
  buttons: {
    position: 'absolute',
    right: 0,
    bottom: -45,
  },
  dirty: {
    border: '1px dashed yellow',
  },
  chipsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

export const IssueLabelsForm: FC<IProps> = ({
  value: labels,
  issueLoading,
  issueId,
  isOwnerOrMember,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const c = useStyles();
  // get all labels
  const { data: labelsData, loading: labelsLoading } = useGetLabelsQuery();

  // handle focus according to dirty fields
  const [fieldFocus, setFieldFocus] = useState(false);
  const [autocompleteActive, setAutocompleteActive] = useState(false);

  const [value, setValue] = useState<{ id: any; name: string; inputValue?: string } | null>(null);
  const filter = createFilterOptions<{ id: any; name: string; inputValue?: string }>();

  // mutations
  const [addLabelToIssueMutation, { loading: loading1 }] = useAddLabelToIssueMutation();
  const [connectExistingLabelToIssueMutation, { loading: loading2 }] =
    useConnectExistingLabelToIssueMutation();
  const loading = loading1 || loading2;
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValue(null);
    if (value?.id === 'new') {
      try {
        const res = await addLabelToIssueMutation({
          variables: {
            issueId,
            labelName: value.name,
          },
        });
        if (res.data?.insert_issue_label_one?.label_id) {
          setFieldFocus(false);
        } else if (res.errors) {
          enqueueSnackbar(`${res.errors[0].message}`, { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar(`${error.message}`, { variant: 'error' });
      }
    } else {
      try {
        const res = await connectExistingLabelToIssueMutation({
          variables: {
            issueId,
            labelId: value?.id,
          },
        });
        if (res.data?.insert_issue_label_one?.label_id) {
          setFieldFocus(false);
        } else if (res.errors) {
          enqueueSnackbar(`${res.errors[0].message}`, { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar(`${error.message}`, { variant: 'error' });
      }
    }
  };

  const [options, setOptions] = useState<{ id: any; name: string; inputValue?: string }[]>([]);
  useEffect(() => {
    let allLabels = labelsData?.labels.map((l) => ({ id: l.id, name: l.name, inputValue: '' }));
    // .filter((item) => {
    //   return labels?.some((f) => {
    //     return f.id === item.id;
    //   });
    // });
    if (allLabels) {
      setOptions(allLabels);
    }
  }, [labelsLoading]);

  // handle label delete
  const [deleteIssueLabelMutation] = useDeleteIssueLabelMutation();
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteIssueLabelMutation({
        variables: {
          issueId,
          labelId: id,
        },
      });
      if (res.data?.delete_issue_label_by_pk?.label_id) {
        enqueueSnackbar('Deleted successfully!', { variant: 'success' });
      } else if (res.errors) {
        enqueueSnackbar(`${res.errors[0].message}`, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(`Error`, { variant: 'error' });
    }
  };

  // handle toggle autocomplete
  const handleToggle = () => {
    if (autocompleteActive) {
      setAutocompleteActive(false);
    } else {
      setAutocompleteActive(true);
    }
  };

  if (!labels) {
    return <Skeleton height={40} />;
  }
  return (
    <form onSubmit={onSubmit} className={c.form}>
      {issueLoading ? (
        <Box className={c.chipsWrapper}>
          <Skeleton height={30} width={80} style={{ borderRadius: '13px' }} />
          <Skeleton height={30} width={80} style={{ borderRadius: '13px' }} />
          <Skeleton height={30} width={80} style={{ borderRadius: '13px' }} />
        </Box>
      ) : (
        <>
          {isOwnerOrMember ? (
            <Box className={c.chipsWrapper}>
              {labels?.map((label) => (
                <Chip
                  label={label.name}
                  key={label.id}
                  onDelete={() =>
                    confirmDialog(`Remove the ${label.name} label?`, () => handleDelete(label.id))
                  }
                  size="small"
                />
              ))}
              <Chip
                label={autocompleteActive ? 'Cancel' : 'Add label'}
                onClick={handleToggle}
                icon={autocompleteActive ? <Cancel /> : <Add />}
                size="small"
                variant={autocompleteActive ? 'default' : 'outlined'}
                color="secondary"
              />
            </Box>
          ) : (
            <Box className={c.chipsWrapper}>
              {labels?.map((l) => (
                <Chip label={l.name} key={l.id} size="small" />
              ))}
            </Box>
          )}
        </>
      )}
      {autocompleteActive && (
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              setValue({
                inputValue: newValue,
                id: 'new',
                name: '',
              });
              setFieldFocus(true);
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setValue({
                name: newValue.inputValue,
                id: 'new',
              });
              setFieldFocus(true);
            } else {
              setValue(newValue);
              setFieldFocus(true);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            // Suggest the creation of a new value
            if (params.inputValue !== '') {
              return [
                {
                  inputValue: params.inputValue,
                  name: `Add "${params.inputValue}"`,
                  id: 'new',
                },
                ...filtered,
              ];
            }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          options={options}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.name;
          }}
          renderOption={(option) => option.name}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add labels"
              variant="filled"
              color="secondary"
              size="small"
            />
          )}
        />
      )}
      {fieldFocus && (
        <DialogActions className={c.buttons}>
          <IconButton type="submit" color="secondary" size="small">
            {loading ? <CloudUpload /> : <Check />}
          </IconButton>
        </DialogActions>
      )}
    </form>
  );
};
