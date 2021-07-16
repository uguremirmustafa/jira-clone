import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import React, { FC, useEffect, useState } from 'react';
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
  console.log(bearerToken);

  const cleanTypeName = new ApolloLink((operation: any, forward: any) => {
    if (operation.variables) {
      const omitTypename = (key: any, value: any) => (key === '__typename' ? undefined : value);
      operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
    }
    return forward(operation).map((data: any) => {
      return data;
    });
  });

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_HASURA_GRAPHQL_ENDPOINT,
  });
  const authLink = setContext((_, { headers, ...rest }) => {
    if (!bearerToken) return { headers, ...rest };

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${bearerToken}`,
      },
    };
  });
  // const apolloLinkWithMiddleware = ApolloLink.from([authLink.concat(httpLink), cleanTypeName]);

  const client = new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),
    link: authLink.concat(httpLink),
    // link: apolloLinkWithMiddleware,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloWrapper;
