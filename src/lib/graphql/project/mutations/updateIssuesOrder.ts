import { gql } from '../../../apollo/client';

export const UpdateIssuesOrder = gql`
  mutation UpdateIssuesOrder($issues: [issues_insert_input!]!, $projectId: uuid!) {
    insert_issues(
      objects: $issues
      on_conflict: {
        constraint: issues_pkey
        update_columns: [index, column_id]
        where: { project_id: { _eq: $projectId } }
      }
    ) {
      returning {
        column_id
        created_at
        description
        id
        index
        owner_id
        priority
        project_id
        title
        type
        updated_at
      }
    }
  }
`;
