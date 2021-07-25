import { Grid, makeStyles, Button, Typography, Box, Divider } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GetIssueByIdQuery, GetProjectByIdQuery } from '../../lib/generated/apolloComponents';
import { IssueTitleForm } from './IssueTitleForm';
import { IssueDescriptionForm } from './IssueDescriptionForm';
import { IssuePriorityForm } from './IssuePriorityForm';
import { IssueTypeForm } from './IssueTypeForm';
import { FieldForNonMembers } from '../../shared/FieldForNonMembers';
import { IssueDetailsAccordion } from './IssueDetailsAccordion';
import { IssueDateInfo } from './IssueDateInfo';
import { IssueTabs } from './IssueTabs';
import { useApolloClient } from '@apollo/client';
import { GetProjectById } from '../../lib/graphql/project/queries/getProjectById';

interface IProps {
  issue: GetIssueByIdQuery | undefined;
  issueLoading: boolean;
  issueId: string;
  isOwnerOrMember: boolean;
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

export const IssueForm: FC<IProps> = ({ issue, issueLoading, issueId, isOwnerOrMember }) => {
  const c = useStyles();
  const client = useApolloClient();
  const [project, setProject] = useState<GetProjectByIdQuery | null>();
  useEffect(() => {
    if (issueLoading) return;
    const project = client.readQuery<GetProjectByIdQuery>({
      query: GetProjectById,
      variables: { projectId: issue?.issues_by_pk?.project_id },
    });
    setProject(project);
  }, [issueLoading, issue, issueId]);

  const projectColumns = project?.projects_by_pk?.columns.map((col) => ({
    id: col.id,
    indexOfLastIssue:
      project?.projects_by_pk?.issues.filter((i) => i.column_id === col.id)[0]?.index || 0,
    name: col.name,
  }));
  const title = issue?.issues_by_pk?.title;
  const description = issue?.issues_by_pk?.description;
  const column = issue?.issues_by_pk?.column;
  const priority = issue?.issues_by_pk?.priority || undefined;
  const type = issue?.issues_by_pk?.type;
  const createdAt = issue?.issues_by_pk?.created_at;
  const updatedAt = issue?.issues_by_pk?.updated_at;
  const issueLabels = issue?.issues_by_pk?.issue_labels
    .map((i) => i.label)
    .map((l) => ({ id: l.id, name: l.name }));
  return (
    <Grid container className={c.root}>
      <Grid item xs={12} md={8} className={c.leftColumn}>
        {isOwnerOrMember ? (
          <IssueTitleForm value={title} issueLoading={issueLoading} issueId={issueId} />
        ) : (
          <FieldForNonMembers value={title} label="Title" />
        )}
        {/* {issueId} */}

        <IssueDescriptionForm
          value={description}
          issueLoading={issueLoading}
          issueId={issueId}
          isOwnerOrMember={isOwnerOrMember}
        />
        {project && (
          <IssueTabs
            issueId={issueId}
            column={column}
            projectColumns={projectColumns}
            issueLoading={issueLoading}
          />
        )}
      </Grid>
      <Grid item xs={12} md={4} className={c.rightColumn}>
        {isOwnerOrMember ? (
          <IssuePriorityForm value={priority} issueLoading={issueLoading} issueId={issueId} />
        ) : (
          <FieldForNonMembers value={priority} label="Priority" />
        )}
        {isOwnerOrMember ? (
          <IssueTypeForm value={type} issueLoading={issueLoading} issueId={issueId} />
        ) : (
          <FieldForNonMembers value={type} label="Type" />
        )}
        <IssueDetailsAccordion
          value={issueLabels}
          issueLoading={issueLoading}
          issueId={issueId}
          isOwnerOrMember={isOwnerOrMember}
        />
        <IssueDateInfo
          createdAt={createdAt}
          updatedAt={updatedAt}
          issueLoading={issueLoading}
          issueId={issueId}
        />
      </Grid>
    </Grid>
  );
};
