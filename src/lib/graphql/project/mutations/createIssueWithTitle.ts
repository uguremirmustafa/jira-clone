import { gql } from '../../../apollo/client';

export const CreateIssueWithTitle = gql`
  mutation CreateIssueWithTitle(
    $projectId: uuid!
    $columnId: uuid!
    $title: String!
    $index: Int!
  ) {
    insert_issues_one(
      object: { project_id: $projectId, column_id: $columnId, title: $title, index: $index }
    ) {
      column_id
      description
      id
      index
      priority
      project_id
      title
      type
      owner_id
    }
  }
`;
