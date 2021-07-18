import { gql } from '@apollo/client';

export const UpdateProject = gql`
  mutation UpdateProject($projectId: uuid!, $title: String, $description: String) {
    update_projects_by_pk(
      pk_columns: { id: $projectId }
      _set: { title: $title, description: $description }
    ) {
      id
      description
      title
    }
  }
`;
