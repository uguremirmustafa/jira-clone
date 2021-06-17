import { gql } from '@apollo/client';

export const GetProjects = gql`
  query GetProjects {
    projects {
      id
      title
      description
      project_owner {
        email
      }
    }
  }
`;
