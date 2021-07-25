import { gql } from '../../../apollo/client';

export const CreateIssueComment = gql`
  mutation CreateIssueComment($issueId: uuid!, $text: String!) {
    insert_comments_one(object: { issue_id: $issueId, text: $text }) {
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
