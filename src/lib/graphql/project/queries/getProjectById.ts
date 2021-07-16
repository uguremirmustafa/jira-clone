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
      columns(order_by: { index: asc }) {
        id
        name
        index
      }
      columns_aggregate {
        aggregate {
          count
        }
      }
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
