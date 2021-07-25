import {
  makeStyles,
  Typography,
  Box,
  Theme,
  Avatar,
  Button,
  ButtonGroup,
  DialogActions,
  IconButton,
} from '@material-ui/core';
import { Check, Close, CloudUpload, Label } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import {
  Comments,
  GetIssueCommentsQuery,
  useDeleteIssueCommentMutation,
  Users,
  useUpdateIssueCommentMutation,
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
import { GetIssueComments } from '../../lib/graphql/issue/queries/getIssueComments';
import { confirmDialog } from '../../shared/ConfirmDialog';

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
    // border: '1px solid lightgray',
    borderRadius: '.2rem',
    background: theme.palette.grey[100],
    padding: theme.spacing(2),
  },

  buttons: {
    position: 'absolute',
    right: 0,
    bottom: 5,
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

  const cancelChanges = () => {
    if (initialRawState !== undefined) {
      setEditorState(EditorState.createWithContent(convertFromRaw(initialRawState)));
      setFieldFocus(false);
      setEditing(false);
    }
  };

  //update issue
  const [updateIssueCommentMutation, { loading }] = useUpdateIssueCommentMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
    const string = JSON.stringify(rawState);
    try {
      const res = await updateIssueCommentMutation({
        variables: {
          commentId: comment.id,
          text: string,
        },
        refetchQueries: [{ query: GetIssueComments, variables: { issueId } }],
      });
      if (res.data?.update_comments_by_pk?.id) {
        enqueueSnackbar('Success', { variant: 'success' });
      } else if (res.errors) {
        enqueueSnackbar(`${res.errors[0].message}`, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}`, { variant: 'error' });
    }
    setFieldFocus(false);
  };

  //delete issue

  const [deleteIssueCommentMutation, { loading: deleteCommentLoading }] =
    useDeleteIssueCommentMutation();

  const deleteComment = async (id: string) => {
    try {
      const res = await deleteIssueCommentMutation({
        variables: {
          commentId: id,
        },
        refetchQueries: [{ query: GetIssueComments, variables: { issueId } }],
      });
      if (res.data?.delete_comments_by_pk) {
        enqueueSnackbar('Success', { variant: 'success' });
      } else if (res.errors) {
        enqueueSnackbar(`${res.errors[0].message}`, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}`, { variant: 'error' });
    }
  };

  return (
    <form className={c.form} onSubmit={onSubmit}>
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
          <div style={editing ? { paddingBottom: '2rem' } : { padding: '0.5rem 0' }}>
            <Editor
              editorState={editorState}
              onEditorStateChange={onChange}
              onFocus={() => setFieldFocus(true)}
              toolbarHidden={!editing}
              readOnly={!editing}
              toolbarClassName="editorToolbar"
              // wrapperClassName="wrapperClassName"
              editorClassName="commentEditor"
            />
          </div>
          {isCommentOwner && !editing && (
            <ButtonGroup>
              <Button
                className={c.commentButton}
                variant="text"
                size="small"
                onClick={() => {
                  confirmDialog('Do you really want to delete your comment?', () =>
                    deleteComment(comment.id)
                  );
                }}
              >
                Delete
              </Button>
              <Button
                className={c.commentButton}
                variant="text"
                size="small"
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>
            </ButtonGroup>
          )}
        </Box>
      </Box>
      {fieldFocus && (
        <>
          {isCommentOwner && (
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
