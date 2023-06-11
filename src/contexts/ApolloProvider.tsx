import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

interface Props {
  children: ReactNode;
}

export const GraphQLClientProvider = ({ children }: Props) => {
  const { currentUser } = useContext(AuthContext);
  const [token, setToken] = useState<string | null>(null);
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  useEffect(() => {
    if (currentUser) {
      currentUser.getIdToken().then(setToken);
    }
  }, [currentUser]);
  useEffect(() => {
    if (token) {
      const httpLink = createHttpLink({
        uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
      });

      const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${token}`,
          },
        };
      });
      const wsLink = new GraphQLWsLink(
        createClient({
          url: import.meta.env.VITE_GRAPHQL_SUBSCRIPTION_ENDPOINT,
          connectionParams: {
            Authorization: `Bearer ${token}`,
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
        link: splitLink,
        cache: new InMemoryCache(),
      });
      setClient(client);
    }
  }, [token]);
  if (!client) {
    return <div>Loading</div>;
  }
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
