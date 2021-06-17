import { gql } from '../../../apollo/client';

export const UpdateProjectUserType = gql`
  mutation UpdateProjectUserRole($projectMemberId: uuid!, $typeId: uuid!) {
    update_project_members_by_pk(pk_columns: { id: $projectMemberId }, _set: { type_id: $typeId }) {
      id
      type_id
      user {
        email
      }
    }
  }
`;
