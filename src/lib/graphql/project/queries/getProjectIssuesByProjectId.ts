import { gql } from '../../../apollo/client';

export const GetProjectIssuesByProjectId = gql`
  query GetProjectIssuesByProjectId($projectId: uuid!) {
    projects_by_pk(id: $projectId) {
      issues {
        column_id
        description
        id
        index
        priority
        project_id
        title
        type
        owner_id
      }
    }
  }
`;
