import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';

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
      const client = new ApolloClient({
        link: authLink.concat(httpLink),
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
