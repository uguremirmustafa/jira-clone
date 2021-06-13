import { gql } from '../../../apollo/client';
export const GetAllProjectUsers = gql`
  query GetAllProjectUsers($projectId: uuid!) {
    project_members(where: { project_id: { _eq: $projectId } }) {
      user {
        id
        email
      }
      type_id
    }
  }
`;
