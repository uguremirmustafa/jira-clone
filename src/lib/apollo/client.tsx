import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import { FC, useEffect, useState } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';
export { gql } from '@apollo/client';
const ApolloWrapper: FC = ({ children }) => {
  //get auth headers
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

  // const wsLink = new WebSocketLink({
  // uri: process.env.REACT_APP_HASURA_GRAPHQL_WS || 'wss://jira-clone.hasura.app/v1/graphql',
  // });

  const authLink = setContext((_, { headers }) => {
    if (!bearerToken) return { headers };

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${bearerToken}`,
      },
    };
  });
  const wsLink = new WebSocketLink(
    new SubscriptionClient('wss://jira-clone.hasura.app/v1/graphql', {
      reconnect: true,
      timeout: 30000,
      connectionParams: {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink)
  );
  const client = new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),
    link: splitLink,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloWrapper;
