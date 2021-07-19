import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import { FC, useEffect, useState } from 'react';
export { gql } from '@apollo/client';
const ApolloWrapper: FC = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [bearerToken, setBearerToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : '';
      setBearerToken(token);
    };
    getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_HASURA_GRAPHQL_ENDPOINT,
  });

  const authLinkHttp = setContext((_, { headers, ...rest }) => {
    if (!bearerToken) return { headers, ...rest };

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${bearerToken}`,
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),
    link: authLinkHttp.concat(httpLink),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloWrapper;
