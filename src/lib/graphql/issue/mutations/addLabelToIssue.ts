import { gql } from '../../../apollo/client';

export const AddLabelToIssue = gql`
  mutation AddLabelToIssue($issueId: uuid!, $labelName: String!) {
    insert_issue_label_one(object: { issue_id: $issueId, label: { data: { name: $labelName } } }) {
      label_id
    }
  }
`;
