import { Divider, Grid, Typography } from '@material-ui/core';
import { formatDistanceToNow, getTime } from 'date-fns';

import { Skeleton } from '@material-ui/lab';
import { FC } from 'react';

interface Props {
  createdAt: string;
  updatedAt: string;
  issueLoading: boolean;
  issueId: string;
}

export const IssueDateInfo: FC<Props> = ({ createdAt, updatedAt, issueLoading, issueId }) => {
  let formattedCreatedAt;
  if (createdAt) {
    formattedCreatedAt = formatDistanceToNow(getTime(new Date(createdAt)), {
      addSuffix: true,
    });
  }
  let formattedUpdatedAt;
  if (updatedAt) {
    formattedUpdatedAt = formatDistanceToNow(getTime(new Date(updatedAt)), {
      addSuffix: true,
    });
  }

  return (
    <div>
      <Typography color="secondary" variant="subtitle2">
        Details
      </Typography>
      <Divider />
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="caption">Created:</Typography>
        </Grid>
        <Grid item xs={6}>
          {issueLoading ? (
            <Skeleton />
          ) : (
            <Typography variant="caption">{formattedCreatedAt}</Typography>
          )}
        </Grid>

        <Grid item xs={6}>
          <Typography variant="caption">Updated:</Typography>
        </Grid>
        <Grid item xs={6}>
          {issueLoading ? (
            <Skeleton />
          ) : (
            <Typography variant="caption">{formattedUpdatedAt}</Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
