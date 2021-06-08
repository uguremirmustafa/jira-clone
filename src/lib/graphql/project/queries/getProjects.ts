import { gql } from '@apollo/client';

export const GetProjectsQuery = gql`
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
