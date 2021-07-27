import { gql } from '../../../apollo/client';

export const UpdateColumnsOrder = gql`
  mutation UpdateColumnsOrder($columns: [columns_insert_input!]!, $projectId: uuid!) {
    insert_columns(
      objects: $columns
      on_conflict: {
        constraint: columns_pkey
        update_columns: [index]
        where: { project_id: { _eq: $projectId } }
      }
    ) {
      returning {
        id
        index
        project_id
        name
      }
    }
  }
`;
