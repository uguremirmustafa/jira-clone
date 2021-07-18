import { gql } from '../../../apollo/client';

export const IssueFragment = gql`
  fragment IssueFragment on issues {
    column_id
    description
    index
    priority
    project_id
    title
    type
    owner_id
  }
`;
