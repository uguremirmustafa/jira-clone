import {
  makeStyles,
  DialogActions,
  Typography,
  IconButton,
  TextField,
  Box,
  Theme,
  Avatar,
  Divider,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import { Check, Close, CloudUpload, Label } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import {
  Comments,
  GetIssueCommentsQuery,
  Users,
  useUpdateIssueDescriptionMutation,
} from '../../lib/generated/apolloComponents';
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
import { getTime } from 'date-fns';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuth0 } from '@auth0/auth0-react';

interface IProps {
  value: {
    __typename?: 'comments' | undefined;
  } & Pick<Comments, 'text' | 'id' | 'created_at' | 'updated_at'> & {
      user: {
        __typename?: 'users' | undefined;
      } & Pick<Users, 'email' | 'id'>;
    };
  issueId: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(8),
  },
  form: {
    position: 'relative',
    marginBottom: theme.spacing(2),
  },
  commentBox: {
    flexGrow: 1,
    // border: '1px solid red',
    background: theme.palette.grey[50],
    padding: theme.spacing(2),
  },
  editorWrapper: {
    // border: '1px solid gray',
    color: theme.palette.secondary.dark,
  },
  buttons: {
    position: 'absolute',
    right: 0,
    bottom: -45,
  },
  commentButton: {
    textTransform: 'capitalize',
    transform: 'translateY(-5px)',
    marginLeft: -5,
  },
}));

export const IssueCommentForm: FC<IProps> = ({ value: comment, issueId }) => {
  const c = useStyles();
  const { user } = useAuth0();
  const isCommentOwner = comment.user.id === user?.sub;

  const { enqueueSnackbar } = useSnackbar();
  const [editing, setEditing] = useState(false);
  const [fieldFocus, setFieldFocus] = useState(false);
  let formattedCreatedAt;
  if (comment.created_at) {
    formattedCreatedAt = formatDistanceToNow(getTime(new Date(comment.created_at)), {
      addSuffix: true,
    });
  }
  let formattedUpdatedAt;
  if (comment.updated_at) {
    formattedUpdatedAt = formatDistanceToNow(getTime(new Date(comment.updated_at)), {
      addSuffix: true,
    });
  }

  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());
  const [rawState, setRawState] = useState<RawDraftContentState>();
  const [initialRawState, setInitialRawState] = useState<RawDraftContentState>();
  const onChange = (editorState: EditorState) => {
    const raw = convertToRaw(editorState.getCurrentContent());
    setRawState(raw);

    setEditorState(editorState);
  };
  const { text } = comment;
  useEffect(() => {
    if (text !== null && text !== undefined) {
      if (text !== '') {
        // parse string data from the db
        const parsedValue = JSON.parse(text);
        // convert raw to state object
        const contentState = convertFromRaw(parsedValue);
        setEditorState(EditorState.createWithContent(contentState));
        setInitialRawState(parsedValue);
      } else {
        setEditorState(EditorState.createEmpty());
      }
    }
  }, [text]);

  return (
    <form className={c.form}>
      <Box display="flex" gridGap="1rem">
        <Avatar style={{ background: '#e63321', width: '2rem', height: '2rem' }}>
          {comment.user.email[0]}
        </Avatar>
        <Box className={c.commentBox}>
          <Box display="flex" alignItems="flex-end" style={editing ? { marginBottom: '1rem' } : {}}>
            <Typography variant="subtitle2">{comment.user.email}</Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              style={{ paddingLeft: '1rem', fontWeight: 'normal' }}
            >
              {formattedCreatedAt}
            </Typography>
          </Box>
          <div className={c.editorWrapper}>
            <Editor
              editorState={editorState}
              onEditorStateChange={onChange}
              toolbarHidden={!editing}
              readOnly={!editing}
            />
          </div>
          {isCommentOwner && (
            <ButtonGroup>
              <Button className={c.commentButton} variant="text" size="small">
                Delete
              </Button>
              <Button
                className={c.commentButton}
                variant="text"
                size="small"
                onClick={() => setEditing(!editing)}
              >
                {editing ? 'Cancel' : 'Edit'}
              </Button>
            </ButtonGroup>
          )}
          {/* <Divider /> */}
        </Box>
      </Box>
    </form>
  );
};
