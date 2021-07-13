// react
import { useState } from 'react';
// material ui
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FC } from 'react';
import {
  Issues,
  Columns,
  useDeleteColumnMutation,
  useUpdateIssuesOrderMutation,
  UpdateIssuesOrderMutationVariables,
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
  };
});

interface IProps {
  columns:
    | ({
        __typename?: 'columns' | undefined;
      } & Pick<Columns, 'id' | 'name' | 'index'> & {
          issues: ({
            __typename?: 'issues' | undefined;
          } & Pick<
            Issues,
            'id' | 'index' | 'title' | 'index' | 'description' | 'priority' | 'type' | 'column_id'
          >)[];
        })[]
    | undefined;
  numOfColumns: number | undefined;
  projectId: string;
  isOwnerOrMember: boolean;
}

const KanbanBoard: FC<IProps> = ({ columns, projectId, numOfColumns }) => {
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
  const [variables, setVariables] = useState<UpdateIssuesOrderMutationVariables>();
  const [updateIssuesOrderMutation] = useUpdateIssuesOrderMutation();
  // drag and drop logic
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // exit if no destination
    if (!destination) {
      return;
    }

    // exit if dropped to the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // make typescript happy
    if (!columns) {
      return;
    }
    // reordering logic

    //find the column
    const [column] = columns.filter((col) => col.id === source.droppableId);
    //find the issue
    const [issue] = column.issues.filter((issue) => issue.id === draggableId);
    //copy the issues
    let newIssues = [
      ...column.issues.map((issue) => ({
        index: issue.index,
        column_id: issue.column_id,
        title: issue.title,
        project_id: projectId,
      })),
    ];

    newIssues.splice(source.index, 1);
    newIssues.splice(destination.index, 0, {
      index: issue.index,
      column_id: issue.column_id,
      title: issue.title,
      project_id: projectId,
    });

    newIssues.map((issue, index) => ({ ...issue, index }));

    // alert(JSON.stringify(newIssues, null, 2));
    try {
      const res = await updateIssuesOrderMutation({
        variables: { projectId, issues: newIssues },
        refetchQueries: [{ query: GetProjectById, variables: { id: projectId } }],
      });
    } catch (error) {
      alert(error);
    }
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
                    text: `Delete - ${col.id}`,
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
                  {col?.issues.map((issue, index) => (
                    <Draggable key={issue.index} draggableId={issue.id} index={index}>
                      {(provided: any) => (
                        <Paper
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className={c.paper}
                        >
                          <Typography>
                            {issue.title}-{issue.index} - <br /> {issue.id}
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
              indexOfLastIssue={col?.issues.length || 0}
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
