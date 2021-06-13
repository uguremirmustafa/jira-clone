import { gql } from '../../../apollo/client';

export const GetUsers = gql`
  query GetUsers {
    users {
      email
      id
    }
  }
`;
