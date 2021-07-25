import { gql } from '../../../apollo/client';

export const GetIssueComments = gql`
  query GetIssueComments($issueId: uuid!) {
    comments(where: { issue_id: { _eq: $issueId } }, order_by: { created_at: desc }) {
      id
      text
      user {
        id
        email
      }
      created_at
      updated_at
    }
  }
`;
