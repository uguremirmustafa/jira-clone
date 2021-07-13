import { gql } from '../../../apollo/client';

export const UpdateIssuesOrder = gql`
  mutation UpdateIssuesOrder($projectId: uuid!, $issues: [issues_insert_input!]!) {
    insert_issues(
      objects: $issues
      on_conflict: {
        constraint: issues_pkey
        update_columns: [index, column_id]
        where: { project_id: { _eq: $projectId } }
      }
    ) {
      affected_rows
    }
  }
`;
