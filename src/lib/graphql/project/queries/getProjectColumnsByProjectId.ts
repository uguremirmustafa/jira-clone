import { gql } from '../../../apollo/client';

export const GetProjectColumnsByProjectId = gql`
  query GetProjectColumnsByProjectId($projectId: uuid!) {
    columns(where: { project_id: { _eq: $projectId } }, order_by: { index: asc }) {
      id
      index
      name
    }
  }
`;
