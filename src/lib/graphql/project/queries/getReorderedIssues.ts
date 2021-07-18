import { gql } from '../../../apollo/client';

export const GetReorderedIssues = gql`
  query GetReorderedIssues($startColId: uuid!, $finishColId: uuid!) {
    issues(where: { column_id: { _in: [$startColId, $finishColId] } }) {
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
`;
