import { gql } from '../../../apollo/client';

export const DeleteColumn = gql`
  mutation DeleteColumn($id: uuid!) {
    delete_columns_by_pk(id: $id) {
      id
      name
      index
    }
  }
`;
