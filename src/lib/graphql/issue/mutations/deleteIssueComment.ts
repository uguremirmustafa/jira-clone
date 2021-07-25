import { gql } from '../../../apollo/client';

export const DeleteIssueComment = gql`
  mutation DeleteIssueComment($commentId: uuid!) {
    delete_comments_by_pk(id: $commentId) {
      id
    }
  }
`;
