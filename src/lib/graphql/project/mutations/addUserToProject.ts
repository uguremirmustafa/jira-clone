import { gql } from '../../../apollo/client';

export const AddUserToProject = gql`
  mutation AddUserToProject($userId: String!, $projectId: uuid!, $typeId: uuid!) {
    insert_project_members_one(
      object: { user_id: $userId, project_id: $projectId, type_id: $typeId }
    ) {
      id
      user {
        email
      }
    }
  }
`;
