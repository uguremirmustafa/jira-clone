import { gql } from '../../../apollo/client';

export const CreateColumn = gql`
  mutation CreateColumn($projectId: uuid!, $name: String!, $index: Int!) {
    insert_columns_one(object: { index: $index, project_id: $projectId, name: $name }) {
      id
    }
  }
`;
