import { gql } from '../../../apollo/client';

export const UpdateIssueComment = gql`
  mutation UpdateIssueComment($commentId: uuid!, $text: String!) {
    update_comments_by_pk(pk_columns: { id: $commentId }, _set: { text: $text }) {
      id
    }
  }
`;
