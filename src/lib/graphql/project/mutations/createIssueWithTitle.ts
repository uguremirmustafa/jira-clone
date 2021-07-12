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
      id
    }
  }
`;
