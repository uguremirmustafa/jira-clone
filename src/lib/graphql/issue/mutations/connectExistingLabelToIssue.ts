import { gql } from '../../../apollo/client';

export const ConnectExistingLabelToIssue = gql`
  mutation ConnectExistingLabelToIssue($issueId: uuid!, $labelId: uuid!) {
    insert_issue_label_one(object: { issue_id: $issueId, label_id: $labelId }) {
      label_id
    }
  }
`;
