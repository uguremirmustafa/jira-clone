import { gql } from '../../../apollo/client';

export const UpdateIssuesOrder = gql`
  mutation UpdateIssuesOrder($issues: [issues_insert_input!]!) {
    insert_issues(
      objects: $issues
      on_conflict: { constraint: issues_pkey, update_columns: [index, column_id] }
    ) {
      returning {
        column_id
        description
        id
        index
        priority
        project_id
        title
        type
        owner_id
      }
    }
  }
`;
