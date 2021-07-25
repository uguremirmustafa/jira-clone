import {
  makeStyles,
  DialogActions,
  Typography,
  IconButton,
  TextField,
  FormHelperText,
} from '@material-ui/core';
import { Check, Close, CloudUpload, Label } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { useUpdateIssueDescriptionMutation } from '../../lib/generated/apolloComponents';
import { Editor } from 'react-draft-wysiwyg';
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSnackbar } from 'notistack';

interface IProps {
  value: string | undefined | null;
  issueLoading: boolean;
  issueId: string;
  isOwnerOrMember: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(8),
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
  buttons: {
    position: 'absolute',
    right: 0,
    bottom: -45,
  },
}));

export const IssueDescriptionForm: FC<IProps> = ({
  value,
  issueLoading,
  issueId,
  isOwnerOrMember,
}) => {
  const c = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [fieldFocus, setFieldFocus] = useState(false);
  const [updateIssueDescriptionMutation, { loading }] = useUpdateIssueDescriptionMutation();

  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());
  const [rawState, setRawState] = useState<RawDraftContentState>();
  const [initialRawState, setInitialRawState] = useState<RawDraftContentState>();

  const onChange = (editorState: EditorState) => {
    const raw = convertToRaw(editorState.getCurrentContent());
    setRawState(raw);

    setEditorState(editorState);
  };

  useEffect(() => {
    if (issueLoading) return;
    if (value !== null && value !== undefined) {
      if (value !== '') {
        // parse string data from the db
        const parsedValue = JSON.parse(value);
        // convert raw to state object
        const contentState = convertFromRaw(parsedValue);
        setEditorState(EditorState.createWithContent(contentState));
        setInitialRawState(parsedValue);
      } else {
        setEditorState(EditorState.createEmpty());
      }
    }
  }, [issueLoading, value]);

  const cancelChanges = () => {
    if (initialRawState !== undefined) {
      setEditorState(EditorState.createWithContent(convertFromRaw(initialRawState)));
      setFieldFocus(false);
    }
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(rawState);
    const rawStateString = JSON.stringify(rawState);
    try {
      const res = await updateIssueDescriptionMutation({
        variables: {
          issueId,
          description: rawStateString,
        },
      });
      if (res.data?.update_issues_by_pk?.id) {
        enqueueSnackbar('success', { variant: 'success' });
      } else if (res.errors) {
        enqueueSnackbar(`${res.errors[0].message}`, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(`${JSON.stringify(error, null, 2)}`, { variant: 'error' });
    }
  };

  return (
    <form onSubmit={onSubmit} className={c.form}>
      <Typography gutterBottom variant="subtitle2" color="secondary">
        Description
      </Typography>
      {issueLoading ? (
        <div>
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} width={200} />
        </div>
      ) : (
        <div
          style={{
            background: '#ededed',
            padding: '8px',
            minHeight: '300px',
            borderRadius: '.2rem',
          }}
        >
          <Editor
            placeholder="There is no description yet, start explaining what needs to be done..."
            onFocus={() => setFieldFocus(true)}
            // onBlur={() => setFieldFocus(false)}
            editorState={editorState}
            onEditorStateChange={onChange}
            toolbarHidden={!(isOwnerOrMember && fieldFocus)}
            readOnly={!isOwnerOrMember}
          />
          {/* <FormHelperText>asdsadsa</FormHelperText> */}
        </div>
      )}
      {fieldFocus && (
        <>
          {isOwnerOrMember && (
            <DialogActions className={c.buttons}>
              {!loading && (
                <IconButton size="small" onClick={cancelChanges}>
                  <Close />
                </IconButton>
              )}
              <IconButton type="submit" color="secondary" size="small">
                {loading ? <CloudUpload /> : <Check />}
              </IconButton>
            </DialogActions>
          )}
        </>
      )}
    </form>
  );
};
