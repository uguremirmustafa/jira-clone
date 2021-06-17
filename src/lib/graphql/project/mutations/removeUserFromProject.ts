import { gql } from '../../../apollo/client';

export const RemoveUserFromProject = gql`
  mutation RemoveUserFromProject($memberId: uuid!) {
    delete_project_members_by_pk(id: $memberId) {
      user {
        email
      }
    }
  }
`;
