import {
  Avatar,
  Box,
  Typography,
  makeStyles,
  Theme,
  IconButton,
  DialogActions,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { getTime } from 'date-fns';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { convertFromRaw, convertToRaw, EditorState, RawDraftContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import React, { FC, useState, useEffect } from 'react';
import {
  useCreateIssueCommentMutation,
  useGetIssueCommentsQuery,
} from '../../lib/generated/apolloComponents';
import { IssueCommentForm } from './IssueCommentForm';
import { Check, Close, CloudUpload } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { GetIssueComments } from '../../lib/graphql/issue/queries/getIssueComments';

interface Props {
  issueId: string;
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(8),
  },
  form: {
    position: 'relative',
    marginBottom: theme.spacing(8),
  },
  commentBox: {
    flexGrow: 1,
    padding: theme.spacing(2),
    background: theme.palette.grey[200],
    borderRadius: '.2rem',
  },
  buttons: {
    position: 'absolute',
    right: 0,
    bottom: -45,
  },
}));
export const IssueComments: FC<Props> = ({ issueId }) => {
  const c = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // editor state initialize
  const [fieldFocus, setFieldFocus] = useState(false);
  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());
  const [rawState, setRawState] = useState<RawDraftContentState>(() =>
    convertToRaw(editorState.getCurrentContent())
  );
  // const [initialRawState, setInitialRawState] = useState<RawDraftContentState>();

  // get data from localstorage
  useEffect(() => {
    const string = window.localStorage.getItem(`jira-clone-${issueId}-comment`);
    if (string) {
      const raw = JSON.parse(string);
      setEditorState(EditorState.createWithContent(convertFromRaw(raw)));
      setRawState(raw);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(`jira-clone-${issueId}-comment`, JSON.stringify(rawState));
  }, [rawState]);

  // handle editor state change
  const onChange = (editorState: EditorState) => {
    // interfere the process and get the raw data in order to store it in db
    const raw = convertToRaw(editorState.getCurrentContent());
    setRawState(raw);
    setEditorState(editorState);
  };

  const cancelChanges = () => {
    setEditorState(EditorState.createEmpty());
    window.localStorage.removeItem(`jira-clone-${issueId}-comment`);
    setFieldFocus(false);
  };

  // push comment to db
  const [createIssueCommentMutation, { loading: commentLoading }] = useCreateIssueCommentMutation();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldFocus(false);
    // console.log(typeof rawState);
    const string = JSON.stringify(rawState);
    try {
      const res = await createIssueCommentMutation({
        variables: {
          issueId,
          text: string,
        },
        refetchQueries: [{ query: GetIssueComments, variables: { issueId } }],
        // update: (cache, { data: response }),
      });

      if (res.data?.insert_comments_one?.id) {
        enqueueSnackbar('Success', { variant: 'success' });
        // setEditorState(EditorState.createEmpty());
        // setRawState(convertToRaw(editorState.getCurrentContent()));
        // window.localStorage.setItem(`jira-clone-${issueId}-comment`, JSON.stringify(rawState));
        cancelChanges();
        // window.localStorage.removeItem(`jira-clone-${issueId}-comment`);
      } else if (res.errors) {
        enqueueSnackbar(`${res.errors[0].message}`, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}`, { variant: 'error' });
    }
  };

  // get issue comments
  const {
    data: commentsData,
    loading: commentsLoading,
    error,
  } = useGetIssueCommentsQuery({
    variables: { issueId },
    fetchPolicy: 'cache-and-network',
  });
  if (commentsLoading) return <Skeleton height={60} />;
  if (error) return <div>{error.message}</div>;
  return (
    <div>
      <form className={c.form} onSubmit={onSubmit}>
        <Box display="flex" gridGap="1rem">
          <Avatar style={{ background: '#e63321' }}>u</Avatar>
          <Box className={c.commentBox}>
            <Editor
              editorState={editorState}
              onEditorStateChange={onChange}
              onFocus={() => setFieldFocus(true)}
              toolbarHidden={!fieldFocus}
              toolbarClassName="editorToolbar"
              // wrapperClassName="wrapperClassName"
              editorClassName="commentEditor"
              placeholder="Add your comment here!"
            />
          </Box>
        </Box>
        {fieldFocus && (
          <DialogActions className={c.buttons}>
            {!commentLoading && (
              <IconButton size="small" onClick={cancelChanges}>
                <Close />
              </IconButton>
            )}
            <IconButton type="submit" color="secondary" size="small">
              {/* {loading ? <CloudUpload /> : <Check />} */}
              <Check />
            </IconButton>
          </DialogActions>
        )}
      </form>
      {commentsData?.comments.map((comment) => (
        <IssueCommentForm value={comment} issueId={issueId} key={comment.id} />
      ))}
    </div>
  );
};
