import { gql } from '@apollo/client';

export const SubscribeToProjectByProjectId = gql`
  subscription SubscribeToProjectByProjectId($projectId: uuid!) {
    projects_by_pk(id: $projectId) {
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
      columns(order_by: { index: asc }) {
        id
        index
        name
      }
      issues(order_by: { index: asc }) {
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
