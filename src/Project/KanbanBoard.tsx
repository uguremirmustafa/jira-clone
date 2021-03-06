// material ui
import {
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Tooltip,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import clsx from 'clsx';
// other stuff
import { FC, useState } from 'react';
import { Issues, Columns } from '../lib/generated/apolloComponents';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import AddColumnForm from './AddColumnForm';
import UpdateColumnForm from './UpdateColumnForm';
import { confirmDialog } from '../shared/ConfirmDialog';
import { MenuButton } from '../shared/MenuButton';
import AddIssueWithTitleForm from './AddIssueWithTitleForm';
import { useReorderIssuesAndNotify } from '../hooks/useReorderIssuesAndNotify';
import { IndexOfLatestColumn } from '../functions/indexOfLastColumn';
import { useDeleteColumnAndNotify } from '../hooks/useDeleteColumnAndNotify';
import { useHistory } from 'react-router-dom';
import { Add, Cancel } from '@material-ui/icons';
import { useReorderColumnsAndNotify } from '../hooks/useReorderColumnsAndNotify';
import DragHandle from '@material-ui/icons/DragHandle';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      minHeight: 300,
      height: '100%',
      gap: theme.spacing(1),
      transition: 'all 2s ease',
    },
    column: {
      backgroundColor: theme.palette.grey[200],
      borderRadius: '8px',
      padding: theme.spacing(2, 2, 6, 2),
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
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      position: 'absolute',
      left: 0,
      bottom: '.5rem',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      // padding: theme.spacing(1, 1, 1, 2),
      marginBottom: theme.spacing(1),
    },
    dragging: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.light,
    },
    flex: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dragButton: { cursor: 'pointer' },
    verticalDragger: { width: '100%' },
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
}

const KanbanBoard: FC<IProps> = ({ columns, projectId, issues, isOwnerOrMember }) => {
  const history = useHistory();
  const c = useStyles();
  // get the index of latest column
  const indexOfLastColumn = IndexOfLatestColumn(columns);
  // call custom hook with optimistic ui logic
  const update = useReorderIssuesAndNotify();
  const updateColumns = useReorderColumnsAndNotify();
  // drag and drop logic
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    // exit if no destination
    if (!destination) return;
    // exit if dropped to the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    // make typescript happy
    if (!columns) return;
    // if the user is dragging a column
    if (type === 'column') {
      //copy the columns data
      let newColumns = [...columns];
      // // find the dragging column
      const draggingColumn =
        newColumns.find((column) => column.id === draggableId) || newColumns[0];

      newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, { ...draggingColumn, index: destination.index });
      const newestColumnsArray = newColumns
        .map((col, index) => ({ ...col, index }))
        .slice()
        .sort((a, b) => (a.index > b.index ? 1 : -1));
      // alert(JSON.stringify(newestColumnsArray, null, 2));
      updateColumns(newestColumnsArray, projectId);
      return;
    }

    // make typescript happy
    if (!issues) return;
    // create array from the issues
    const startColumnIssuesArray = issues.filter((issue) => issue.column_id === source.droppableId);
    const finishColumnIssuesArray = issues.filter(
      (issue) => issue.column_id === destination.droppableId
    );
    // find the dragging issue
    const draggingIssue =
      startColumnIssuesArray.find((issue) => issue.id === draggableId) || startColumnIssuesArray[0];

    // IN THE SAME COLUMN
    if (source.droppableId === destination.droppableId) {
      // remove the dragging issue from the array
      startColumnIssuesArray.splice(source.index, 1);
      // put the dragging issue into the new place
      startColumnIssuesArray.splice(destination.index, 0, {
        ...draggingIssue,
        index: destination.index,
      });
      const newestIssuesArray = startColumnIssuesArray
        .map((issue, index) => ({ ...issue, index }))
        .slice()
        .sort((a, b) => (a.index > b.index ? 1 : -1));
      update(newestIssuesArray, projectId);
    }
    // BETWEEN DIFFERENT COLUMNS
    // remove the dragging issue from its position in start column
    startColumnIssuesArray.splice(source.index, 1);
    // put removed issue to the correct position in the finish column
    finishColumnIssuesArray.splice(destination.index, 0, {
      ...draggingIssue,
      column_id: destination.droppableId,
    });
    // change the index values of the issues in start column
    const newestStartColumnIssuesArray = startColumnIssuesArray.map((issue, index) => ({
      ...issue,
      index,
    }));
    // change the index values of the issues in finish column
    const newestFinishColumnIssuesArray = finishColumnIssuesArray.map((issue, index) => ({
      ...issue,
      index,
    }));
    const newestIssuesArray = [...newestStartColumnIssuesArray, ...newestFinishColumnIssuesArray]
      .slice()
      .sort((a, b) => (a.index > b.index ? 1 : -1));

    update(newestIssuesArray, projectId);
  };

  const deleteColumn = useDeleteColumnAndNotify();

  // handle modal state
  const handleClickOpen = (issueId: string) => {
    history.push(`/project/${projectId}/board/issue/${issueId}`);
  };

  if (!issues)
    return <Typography>There is no issue here, I guess due date is not this week!</Typography>;
  if (!columns) {
    return <Typography>There is no issue here, I guess due date is not this week!</Typography>;
  }
  if (!isOwnerOrMember) {
    return (
      <Grid container className={c.root}>
        {columns.length > 0 ? (
          columns?.map((col) => (
            <>
              <Grid item xs className={c.column} key={col.id}>
                <Typography variant="subtitle1">{col.name}</Typography>
                <Divider />
                <div className={c.dots}>
                  <MenuButton
                    icon={<MoreVertIcon />}
                    items={[
                      {
                        text: `Details of column ${col.name}`,
                        func: () => {
                          alert('heyy');
                        },
                      },
                    ]}
                  />
                </div>
                <div key={col.id}>
                  {issues
                    ?.filter((issue) => issue.column_id === col.id)
                    ?.map((issue) => (
                      <>
                        <Card className={clsx(c.paper)} onClick={() => handleClickOpen(issue.id)}>
                          <CardActionArea>
                            <CardContent>
                              <Typography>{issue.title}</Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </>
                    ))}
                </div>
              </Grid>
            </>
          ))
        ) : (
          <Typography>There is no issue here, I guess due date is not this week!</Typography>
        )}
      </Grid>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <Grid
              container
              className={c.root}
              {...provided.droppableProps}
              innerRef={provided.innerRef}
            >
              {columns?.map((col, index) => (
                <Draggable draggableId={col.id} index={index}>
                  {(provided) => (
                    <Grid
                      item
                      xs
                      className={c.column}
                      key={col.id}
                      {...provided.draggableProps}
                      innerRef={provided.innerRef}
                    >
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
                                confirmDialog('Are you sure?', () =>
                                  deleteColumn(col.id, columns, projectId)
                                );
                              },
                            },
                            {
                              text: `Details of column ${col.name}`,
                              func: () => {
                                alert('This is not implemented yet!');
                              },
                            },
                          ]}
                        />
                        <Tooltip title="Click and drag!">
                          <IconButton {...provided.dragHandleProps} disableRipple>
                            <DragIndicatorIcon className={c.verticalDragger} />
                          </IconButton>
                        </Tooltip>
                      </div>

                      <Droppable droppableId={col.id} key={col.id} type="issue">
                        {(provided: any) => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            {issues
                              ?.filter((issue) => issue.column_id === col.id)
                              ?.map((issue, index) => (
                                <Draggable key={issue.id} draggableId={issue.id} index={index}>
                                  {(provided: any, snapshot: any) => (
                                    <Card
                                      {...provided.draggableProps}
                                      ref={provided.innerRef}
                                      className={clsx(
                                        c.paper,
                                        c.flex,
                                        snapshot.isDragging ? c.dragging : null
                                      )}
                                    >
                                      <CardActionArea>
                                        <CardContent onClick={() => handleClickOpen(issue.id)}>
                                          <Typography>{issue.title}</Typography>
                                        </CardContent>
                                      </CardActionArea>
                                      <CardActions>
                                        <Tooltip title="Click and drag!">
                                          <IconButton
                                            {...provided.dragHandleProps}
                                            className={c.dragButton}
                                            size="small"
                                            disableRipple
                                          >
                                            <DragIndicatorIcon fontSize="small" />
                                          </IconButton>
                                        </Tooltip>
                                      </CardActions>
                                    </Card>
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
                        indexOfLastIssue={
                          issues?.filter((issue) => issue.column_id === col.id).length || 0
                        }
                      />
                    </Grid>
                  )}
                </Draggable>
              ))}
              <AddColumnForm projectId={projectId} indexOfLastColumn={indexOfLastColumn} />
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default KanbanBoard;
