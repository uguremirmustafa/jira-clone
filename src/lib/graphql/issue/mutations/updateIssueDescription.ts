import { gql } from '../../../apollo/client';

export const UpdateIssueDescription = gql`
  mutation UpdateIssueDescription($issueId: uuid!, $description: String!) {
    update_issues_by_pk(pk_columns: { id: $issueId }, _set: { description: $description }) {
      id
      description
    }
  }
`;
