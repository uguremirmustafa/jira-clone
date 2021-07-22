import { Grid, makeStyles, Button, Typography, Box, Divider } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GetIssueByIdQuery } from '../../lib/generated/apolloComponents';

import { IssueTitleForm } from './IssueTitleForm';
import { IssueDescriptionForm } from './IssueDescriptionForm';
import { IssuePriorityForm } from './IssuePriorityForm';
import { IssueTypeForm } from './IssueTypeForm';
import { FieldForNonMembers } from '../../shared/FieldForNonMembers';

interface IProps {
  issue: GetIssueByIdQuery | undefined;
  issueLoading: boolean;
  issueId: string;
  isMember: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(8),
  },
  leftColumn: {
    paddingRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
  },
}));

export const IssueForm: FC<IProps> = ({ issue, issueLoading, issueId, isMember }) => {
  const c = useStyles();

  const title = issue?.issues_by_pk?.title;
  const priority = issue?.issues_by_pk?.priority || undefined;
  const type = issue?.issues_by_pk?.type;

  return (
    <Grid container className={c.root}>
      <Grid item xs={12} md={8} className={c.leftColumn}>
        {isMember ? (
          <IssueTitleForm value={title} issueLoading={issueLoading} issueId={issueId} />
        ) : (
          <FieldForNonMembers value={title} label="Title" />
        )}

        {/* <IssueDescriptionForm
          value={issue?.issues_by_pk?.description}
          issueLoading={issueLoading}
          issueId={issueId}
        /> */}
      </Grid>
      <Grid item xs={12} md={4} className={c.rightColumn}>
        {isMember ? (
          <IssuePriorityForm value={priority} issueLoading={issueLoading} issueId={issueId} />
        ) : (
          <FieldForNonMembers value={priority} label="Priority" />
        )}
        {isMember ? (
          <IssueTypeForm value={type} issueLoading={issueLoading} issueId={issueId} />
        ) : (
          <FieldForNonMembers value={type} label="Type" />
        )}
      </Grid>
    </Grid>
  );
};
