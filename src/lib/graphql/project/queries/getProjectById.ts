import { gql } from '@apollo/client';

export const GetProjectById = gql`
  query GetProjectById($id: uuid!) {
    projects_by_pk(id: $id) {
      id
      title
      description
      project_members {
        user_id
        user {
          id
          email
        }
      }
    }
  }
`;
