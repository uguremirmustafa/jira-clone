import { gql } from '@apollo/client';

export const CreateProject = gql`
  mutation CreateProject($title: String!, $description: String) {
    insert_projects_one(object: { title: $title, description: $description }) {
      id
      title
      description
    }
  }
`;
