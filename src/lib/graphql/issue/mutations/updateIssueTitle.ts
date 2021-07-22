import { gql } from '../../../apollo/client';

export const UpdateIssueTitle = gql`
  mutation UpdateIssueTitle($issueId: uuid!, $title: String!) {
    update_issues_by_pk(pk_columns: { id: $issueId }, _set: { title: $title }) {
      id
      title
    }
  }
`;
