import { gql } from '@apollo/client';

export const GetProjectById = gql`
  query GetProjectById($id: uuid!) {
    projects_by_pk(id: $id) {
      id
      title
      description
      owner_id
      project_members {
        id
        user_id
        user {
          email
        }
        type_id
      }
      issues {
        title
      }
    }
  }
`;
