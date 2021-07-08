import { gql } from '../../../apollo/client';

export const UpdateColumn = gql`
  mutation UpdateColumn($id: uuid!, $name: String!, $index: Int) {
    update_columns_by_pk(pk_columns: { id: $id }, _set: { name: $name, index: $index }) {
      id
    }
  }
`;
