import { gql } from '../../../apollo/client';

export const SubscribeIssueById = gql`
  subscription SubscribeIssueById($issueId: uuid!) {
    issues_by_pk(id: $issueId) {
      id
      title
      description
      column {
        id
        name
      }
      issue_owner {
        id
        email
      }
      created_at
      updated_at
      priority
      type
      owner_id
      project_id
    }
  }
`;
