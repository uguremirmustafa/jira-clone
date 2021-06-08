import { gql } from '@apollo/client';

export const UpdateProject = gql`
  mutation UpdateProject($id: uuid!, $title: String, $description: String) {
    update_projects_by_pk(
      pk_columns: { id: $id }
      _set: { title: $title, description: $description }
    ) {
      id
      description
      title
    }
  }
`;
