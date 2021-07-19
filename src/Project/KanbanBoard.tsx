// material ui
import {
  Button,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
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
import IssueDialog from './IssueDialog';

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
  const c = useStyles();
  // get the index of latest column
  const indexOfLastColumn = IndexOfLatestColumn(columns);
  // call custom hook with optimistic ui logic
  const update = useReorderIssuesAndNotify();
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

  const [open, setOpen] = useState(false);
  const [openIssue, setOpenIssue] = useState('');
  const handleClickOpen = (issueId: string) => {
    setOpenIssue(issueId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              <IssueDialog open={open} onClose={handleClose} issue={openIssue} />
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
                        confirmDialog('Are you sure?', () =>
                          deleteColumn(col.id, columns, projectId)
                        );
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
                                <IconButton
                                  {...provided.dragHandleProps}
                                  className={c.dragButton}
                                  size="small"
                                >
                                  <DragIndicatorIcon fontSize="small" />
                                </IconButton>
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
                indexOfLastIssue={issues?.filter((issue) => issue.column_id === col.id).length || 0}
              />
            </Grid>
          ))}
          <Grid item className={c.column}>
            <AddColumnForm projectId={projectId} indexOfLastColumn={indexOfLastColumn} />
          </Grid>
        </Grid>
      </DragDropContext>

      <IssueDialog open={open} onClose={handleClose} issue={openIssue} />
    </>
  );
};

export default KanbanBoard;
// subscrib
