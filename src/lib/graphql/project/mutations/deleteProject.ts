import { gql } from '@apollo/client';

export const DeleteProject = gql`
  mutation DeleteProject($id: uuid!) {
    delete_projects_by_pk(id: $id) {
      id
      title
    }
  }
`;
