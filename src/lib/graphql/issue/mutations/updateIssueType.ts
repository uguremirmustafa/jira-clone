import { gql } from '../../../apollo/client';

export const UpdateIssueType = gql`
  mutation UpdateIssueType($issueId: uuid!, $type: String!) {
    update_issues_by_pk(pk_columns: { id: $issueId }, _set: { type: $type }) {
      id
      type
    }
  }
`;
