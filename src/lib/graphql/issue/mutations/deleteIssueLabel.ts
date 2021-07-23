import { gql } from '../../../apollo/client';

export const DeleteIssueLabel = gql`
  mutation DeleteIssueLabel($issueId: uuid!, $labelId: uuid!) {
    delete_issue_label_by_pk(issue_id: $issueId, label_id: $labelId) {
      label_id
    }
  }
`;
