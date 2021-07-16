// react
import { useState } from 'react';
// material ui
import { Button, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
// other stuff
import { FC } from 'react';
import {
  Issues,
  Columns,
  useDeleteColumnMutation,
  useUpdateIssuesOrderMutation,
  Issues_Insert_Input,
  GetProjectByIdQuery,
  GetProjectIssuesByProjectIdQuery,
} from '../lib/generated/apolloComponents';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import AddColumnForm from './AddColumnForm';
import UpdateColumnForm from './UpdateColumnForm';
import { useSnackbar } from 'notistack';
import { GetProjectById } from '../lib/graphql/project/queries/getProjectById';
import { confirmDialog } from '../shared/ConfirmDialog';
import { MenuButton } from '../shared/MenuButton';
import AddIssueWithTitleForm from './AddIssueWithTitleForm';
import { GetProjectIssuesByProjectId } from '../lib/graphql/project/queries/getProjectIssuesByProjectId';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      minHeight: 300,
      height: '100%',
      gap: theme.spacing(2),
    },
    column: {
      backgroundColor: '#ededed',
      borderRadius: '8px',
      padding: theme.spacing(2, 2, 14, 2),
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      width: '100%',
      maxWidth: '280px',
      minWidth: '200px',
      position: 'relative',
      height: '100%',
    },
    dots: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    paper: {
      backgroundColor: '#fff',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    dragging: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.light,
    },
  };
});

interface IProps {
  columns: Pick<Columns, 'id' | 'name' | 'index'>[] | undefined;
  numOfColumns: number | undefined;
  projectId: string;
  isOwnerOrMember: boolean;
  issues:
    | Pick<
        Issues,
        | 'title'
        | 'id'
        | 'description'
        | 'owner_id'
        | 'index'
        | 'column_id'
        | 'priority'
        | 'project_id'
        | 'type'
      >[]
    | undefined;
}

const KanbanBoard: FC<IProps> = ({ columns, projectId, numOfColumns, issues }) => {
  const c = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  // set the index of latest column
  let indexOfLastColumn = 0; // make ts happy
  if (columns) {
    if (columns.length > 0) {
      indexOfLastColumn = columns[columns.length - 1].index;
    }
  }
  // update issues order mutation
  const [updateIssuesOrderMutation] = useUpdateIssuesOrderMutation();

  // drag and drop logic
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // exit if no destination
    if (!destination) return;

    // exit if dropped to the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    // make typescript happy
    if (!issues) return;

    // in the same column
    if (source.droppableId === destination.droppableId) {
      // create an array of issues with start column
      let issuesArray = issues.filter((issue) => issue.column_id === source.droppableId);
      // find the dragging issue

      let draggingIssue = issuesArray.find((issue) => issue.id === draggableId) || issuesArray[0];
      // remove the dragging issue from the array
      issuesArray.splice(source.index, 1);
      // put the dragging issue into the new place
      issuesArray.splice(destination.index, 0, draggingIssue);
      let newestIssuesArray = issuesArray.map((issue, index) => ({ ...issue, index: index }));

      // alert(JSON.stringify(newestIssuesArray, null, 2));

      // update in the db
      enqueueSnackbar(`Updating order in the db`, {
        variant: 'info',
      });
      try {
        const res = await updateIssuesOrderMutation({
          // refetchQueries: [{ query: GetProjectById, variables: { id: projectId } }],
          variables: { projectId, issues: newestIssuesArray },
          update: (cache, { data: response }) => {
            let cachedIssues = cache.readQuery<GetProjectIssuesByProjectIdQuery>({
              query: GetProjectIssuesByProjectId,
              variables: { projectId },
            });

            if (cachedIssues) {
              if (cachedIssues.projects_by_pk) {
                cache.writeQuery<GetProjectIssuesByProjectIdQuery>({
                  query: GetProjectIssuesByProjectId,
                  variables: { projectId },
                  data: {
                    projects_by_pk: {
                      issues: {
                        ...cachedIssues?.projects_by_pk.issues,
                        ...response?.insert_issues?.returning,
                      },
                    },
                  },
                });
              }
            }
          },
          optimisticResponse: {
            insert_issues: {
              returning: {
                ...newestIssuesArray,
              },
            },
          },
        });
        if (res.data?.insert_issues !== null) {
          enqueueSnackbar(`Reordered issues in db successfully`, {
            variant: 'success',
          });
        } else if (res.data.insert_issues === null) {
          enqueueSnackbar('Something went wrong', { variant: 'error' });
        } else if (res.errors) {
          enqueueSnackbar(`${res.errors[0].message}`, { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar(`${error.message}`, {
          variant: 'error',
        });
      }
    }

    // between different columns
  };

  // handle delete
  const [deleteColumnMutation] = useDeleteColumnMutation({
    refetchQueries: [{ query: GetProjectById, variables: { id: projectId } }],
  });
  const handleDelete = async (columnId: any) => {
    try {
      enqueueSnackbar('Deleting column from database, wait...', {
        variant: 'info',
      });
      const res = await deleteColumnMutation({ variables: { id: columnId } });
      if (res.data?.delete_columns_by_pk !== null) {
        enqueueSnackbar(`Column deleted successfully`, {
          variant: 'success',
        });
      } else if (res.data.delete_columns_by_pk === null) {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      } else if (res.errors) {
        enqueueSnackbar(`${res.errors[0].message}`, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}`, {
        variant: 'warning',
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container className={c.root}>
        {columns?.map((col) => (
          <Grid item xs className={c.column} key={col?.id}>
            <UpdateColumnForm
              projectId={projectId}
              name={col?.name}
              id={col?.id}
              index={col?.index}
            />
            <div className={c.dots}>
              <MenuButton
                icon={<MoreVertIcon />}
                items={[
                  {
                    text: `Delete Column`,
                    func: () => {
                      confirmDialog('Are you sure?', () => handleDelete(col.id));
                    },
                  },
                  {
                    text: `Details of column ${col.name}`,
                    func: () => {
                      alert('heyy');
                    },
                  },
                ]}
              />
            </div>

            <Droppable droppableId={col.id} key={col.id}>
              {(provided: any) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {issues
                    ?.filter((issue) => issue.column_id === col.id)
                    ?.map((issue: any, index: number) => (
                      <Draggable key={issue.index} draggableId={issue.id} index={index}>
                        {(provided: any, snapshot: any) => (
                          <Paper
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={clsx(c.paper, snapshot.isDragging ? c.dragging : null)}
                          >
                            <Typography>
                              {issue.title} - {issue.index}
                            </Typography>
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <AddIssueWithTitleForm
              columnId={col.id}
              projectId={projectId}
              indexOfLastIssue={issues?.filter((issue) => issue.column_id === col.id).length || 0}
              // indexOfLastIssue={col?.issues[col.issues.length - 1]?.index || 0}
            />
          </Grid>
        ))}
        <Grid item className={c.column}>
          <AddColumnForm projectId={projectId} indexOfLastColumn={indexOfLastColumn} />
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

export default KanbanBoard;
