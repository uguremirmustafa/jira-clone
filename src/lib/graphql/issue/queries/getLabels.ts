import { gql } from '../../../apollo/client';

export const GetLabels = gql`
  query GetLabels {
    labels {
      id
      name
    }
  }
`;
