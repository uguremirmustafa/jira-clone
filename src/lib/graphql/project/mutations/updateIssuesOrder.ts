import { gql } from '../../../apollo/client';

export const UpdateIssuesOrder = gql`
  mutation UpdateIssuesOrder(
    $projectId: uuid!
    $issues: [issues_insert_input!]!
    $update_columns: [issues_update_column!] = [index, column_id]
  ) {
    insert_issues(
      objects: $issues
      on_conflict: {
        constraint: issues_pkey
        update_columns: $update_columns
        where: { project_id: { _eq: $projectId } }
      }
    ) {
      affected_rows
    }
  }
`;
