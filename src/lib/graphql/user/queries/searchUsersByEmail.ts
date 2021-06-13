import { gql } from '../../../apollo/client';
export const SearchUsersByEmail = gql`
  query SearchUsersByEmail($email: String!) {
    search_users(args: { useremail: $email }) {
      email
      id
    }
  }
`;
