import { gql } from '../../../apollo/client';

export const DeleteIssue = gql`
  mutation DeleteIssue($issueId: uuid!) {
    delete_issues_by_pk(id: $issueId) {
      id
    }
  }
`;
