// material ui
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
// other stuff
import { FC } from 'react';
import {
  Issues,
  Columns,
  useDeleteColumnMutation,
  useUpdateIssuesOrderMutation,
  GetProjectByIdQuery,
} from '../lib/generated/apolloComponents';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import AddColumnForm from './AddColumnForm';
import UpdateColumnForm from './UpdateColumnForm';
import { useSnackbar } from 'notistack';
import { GetProjectById } from '../lib/graphql/project/queries/getProjectById';
import { confirmDialog } from '../shared/ConfirmDialog';
import { MenuButton } from '../shared/MenuButton';
import AddIssueWithTitleForm from './AddIssueWithTitleForm';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      minHeight: 300,
      height: '100%',
      gap: theme.spacing(1),
      transition: 'all 2s ease',
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
      minHeight: '300px',
      transition: 'all 2s ease',
    },
    dots: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    paper: {
      backgroundColor: '#fff',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    dragging: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.light,
    },
  };
});

interface IProps {
  columns: Pick<Columns, 'id' | 'name' | 'index'>[] | undefined;
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
  // loading: boolean;
}

const KanbanBoard: FC<IProps> = ({ columns, projectId, issues }) => {
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
    // create array from the issues
    let startColumnIssuesArray = issues.filter((issue) => issue.column_id === source.droppableId);
    let finishColumnIssuesArray = issues.filter(
      (issue) => issue.column_id === destination.droppableId
    );
    // find the dragging issue
    let draggingIssue =
      startColumnIssuesArray.find((issue) => issue.id === draggableId) || startColumnIssuesArray[0];

    // in the same column
    if (source.droppableId === destination.droppableId) {
      // create an array of issues with start column
      let issuesArray = startColumnIssuesArray;

      // remove the dragging issue from the array
      issuesArray.splice(source.index, 1);
      // put the dragging issue into the new place
      issuesArray.splice(destination.index, 0, draggingIssue);
      let newestIssuesArray = issuesArray.map((issue, index) => ({ ...issue, index: index }));

      try {
        const res = await updateIssuesOrderMutation({
          variables: {
            issues: newestIssuesArray.slice().sort((a, b) => (a.index > b.index ? 1 : -1)),
          },
          // refetchQueries: [{ query: GetProjectById, variables: { projectId } }],
          optimisticResponse: {
            __typename: 'mutation_root',
            insert_issues: {
              __typename: 'issues_mutation_response',
              returning: newestIssuesArray.slice().sort((a, b) => (a.index > b.index ? 1 : -1)),
            },
          },
          update: async (cache, { data: response }) => {
            const data = await cache.readQuery<GetProjectByIdQuery>({
              query: GetProjectById,
              variables: { projectId },
            });
            if (!response?.insert_issues?.returning) return;
            if (data?.projects_by_pk?.issues) {
              let newIssues = data.projects_by_pk.issues
                .map(
                  (issue) =>
                    response.insert_issues?.returning.find((i) => i.id === issue.id) || issue
                )
                .slice()
                .sort((a, b) => (a.index > b.index ? 1 : -1));
              cache.writeQuery<GetProjectByIdQuery>({
                query: GetProjectById,
                variables: { projectId },
                data: {
                  __typename: 'query_root',
                  projects_by_pk: {
                    ...data.projects_by_pk,
                    issues: newIssues,
                  },
                },
              });
            }
          },
        });
        if (res.data?.insert_issues?.returning !== null) {
          enqueueSnackbar(`Reordered issues in db successfully`, {
            variant: 'success',
          });
        } else if (res.data.insert_issues === null) {
          enqueueSnackbar(`${JSON.stringify(res.data, null, 2)}`, { variant: 'error' });
        } else if (res.errors) {
          enqueueSnackbar(`${JSON.stringify(res.errors, null, 2)}`, { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar(`${JSON.stringify(error, null, 2)} -asdklasj`, {
          variant: 'error',
        });
      }
      return;
    }

    // between different columns

    // remove the dragging issue from its position in start column
    startColumnIssuesArray.splice(source.index, 1);
    // put removed issue to the correct position in the finish column
    finishColumnIssuesArray.splice(destination.index, 0, {
      ...draggingIssue,
      column_id: destination.droppableId,
    });
    // change the index values of the issues in start column
    let newestStartColumnIssuesArray = startColumnIssuesArray.map((issue, index) => ({
      ...issue,
      index,
    }));
    // change the index values of the issues in finish column
    let newestFinishColumnIssuesArray = finishColumnIssuesArray.map((issue, index) => ({
      ...issue,
      index,
    }));
    let newestIssuesArray = [...newestStartColumnIssuesArray, ...newestFinishColumnIssuesArray];

    // update in db
    try {
      const res = await updateIssuesOrderMutation({
        variables: {
          issues: newestIssuesArray.slice().sort((a, b) => (a.index > b.index ? 1 : -1)),
        },

        optimisticResponse: {
          __typename: 'mutation_root',
          insert_issues: {
            __typename: 'issues_mutation_response',
            returning: newestIssuesArray.slice().sort((a, b) => (a.index > b.index ? 1 : -1)),
          },
        },
        update: async (cache, { data: response }) => {
          const data = await cache.readQuery<GetProjectByIdQuery>({
            query: GetProjectById,
            variables: { projectId },
          });
          if (!response?.insert_issues?.returning) return;
          if (data?.projects_by_pk?.issues) {
            let newIssues = data.projects_by_pk.issues
              .slice()
              .sort((a, b) => (a.index > b.index ? 1 : -1))
              .map(
                (issue) => response.insert_issues?.returning.find((i) => i.id === issue.id) || issue
              )
              .slice()
              .sort((a, b) => (a.index > b.index ? 1 : -1));
            cache.writeQuery<GetProjectByIdQuery>({
              query: GetProjectById,
              variables: { projectId },
              data: {
                __typename: 'query_root',
                projects_by_pk: {
                  ...data.projects_by_pk,
                  issues: newIssues,
                },
              },
            });
          }
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
  };

  // handle delete
  const [deleteColumnMutation] = useDeleteColumnMutation();
  const handleDelete = async (columnId: any) => {
    try {
      enqueueSnackbar('Deleting column from database, wait...', {
        variant: 'info',
      });
      const res = await deleteColumnMutation({
        variables: { id: columnId },
        refetchQueries: [{ query: GetProjectById, variables: { projectId } }],
      });
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
          <Grid item xs className={c.column} key={col.id}>
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
                    ?.map((issue, index) => (
                      <Draggable key={issue.index} draggableId={issue.id} index={index}>
                        {(provided: any, snapshot: any) => (
                          <Paper
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={clsx(c.paper, snapshot.isDragging ? c.dragging : null)}
                          >
                            <Typography>{issue.title}</Typography>
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
