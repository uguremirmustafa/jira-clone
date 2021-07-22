import { gql } from '../../../apollo/client';

export const UpdateIssuePriority = gql`
  mutation UpdateIssuePriority($issueId: uuid!, $priority: Int!) {
    update_issues_by_pk(pk_columns: { id: $issueId }, _set: { priority: $priority }) {
      id
      priority
    }
  }
`;
