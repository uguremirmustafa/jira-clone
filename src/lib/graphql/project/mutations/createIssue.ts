import { gql } from '../../../apollo/client';

export const CreateIssue = gql`
  mutation CreateIssue(
    $projectId: uuid!
    $title: String!
    $priority: Int
    $description: String
    $type: String
  ) {
    insert_issues_one(
      object: {
        title: $title
        project_id: $projectId
        priority: $priority
        description: $description
        type: $type
      }
    ) {
      id
    }
  }
`;
