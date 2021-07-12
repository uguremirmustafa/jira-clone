// material ui
import { MenuItem, Menu, IconButton, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import React, { useState } from 'react';
import { FC } from 'react';
import {
  Issues,
  Columns,
  useDeleteColumnMutation,
  DeleteColumnMutationVariables,
} from '../lib/generated/apolloComponents';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import AddColumnForm from './AddColumnForm';
import UpdateColumnForm from './UpdateColumnForm';
import { useSnackbar } from 'notistack';
import { GetProjectById } from '../lib/graphql/project/queries/getProjectById';
import { confirmDialog } from '../shared/ConfirmDialog';
import { MenuButton } from '../shared/MenuButton';
import { ArrowRightTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      minHeight: 300,
      // backgroundColor: '#ededed',
      // padding: '1rem',
      gap: theme.spacing(2),
      // border: '1px solid blue',
    },
    column: {
      backgroundColor: '#ededed',
      borderRadius: '8px',
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      width: '100%',
      maxWidth: '280px',
      minWidth: '200px',
      position: 'relative',
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
            'title' | 'index' | 'description' | 'priority' | 'type' | 'column_id'
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
  const onDragEnd = (result: DropResult) => {
    //todo
    alert(JSON.stringify(result, null, 2));
  };

  // handle delete
  const [deleteColumnMutation] = useDeleteColumnMutation({
    refetchQueries: [{ query: GetProjectById, variables: { id: projectId } }],
  });
  const handleDelete = async (columnId: any) => {
    // console.log(event);
    // let columnId;
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
      // handleClose();
    } catch (error) {
      enqueueSnackbar(`${error.message}`, {
        variant: 'warning',
      });
      // handleClose();
    }
    // alert('delete' + columnId);
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
                    <Draggable key={issue.title} draggableId={issue.title} index={index}>
                      {(provided: any) => (
                        <Paper
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className={c.paper}
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
