import { makeStyles, DialogActions, Typography, IconButton } from '@material-ui/core';
import { Check, Close, Label } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { useEffect, useState } from 'react';
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

interface IProps {
  value: string | undefined | null;
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
  buttons: {
    position: 'absolute',
    right: 0,
    bottom: -45,
  },
}));

export const IssueDescriptionForm: FC<IProps> = ({ value, issueLoading, issueId }) => {
  const c = useStyles();
  const [updateIssueDescriptionMutation] = useUpdateIssueDescriptionMutation();
  const [parsedValue, setParsedValue] = useState<ContentState>();

  useEffect(() => {
    if (value === null || value === undefined) {
      return;
    }
    const parsed = JSON.parse(value);
    const raw = convertFromRaw(parsed);
    setParsedValue(raw);
  }, [value, issueLoading, issueId]);

  // const [editorState, setEditorState] = useState(() => EditorState.createWithContent(parsedValue));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const descriptionRaw = convertToRaw(editorState.getCurrentContent());
    // const descriptionString = JSON.stringify(descriptionRaw);
    // console.log(descriptionString);
    // updateIssueDescriptionMutation({
    //   variables: { issueId, description: descriptionString },
    // });
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
          {/* <Editor
            editorState={editorState}
            // initialContentState={content}
            onEditorStateChange={setEditorState}
          /> */}
        </div>
      )}
      {/* {fieldFocus && ( */}
      <DialogActions className={c.buttons}>
        <IconButton size="small">
          <Close />
        </IconButton>
        <IconButton type="submit" color="secondary" size="small">
          <Check />
        </IconButton>
      </DialogActions>
      {/* )} */}
    </form>
  );
};
