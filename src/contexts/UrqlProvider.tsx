import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Client, cacheExchange, fetchExchange } from 'urql';
import { AuthContext } from './AuthProvider';

interface Props {
  children: ReactNode;
}

interface ContextProps {
  client: Client | null;
}
const UrqlContext = createContext<ContextProps>({
  client: null,
});

export const UrqlProvier = ({ children }: Props) => {
  const { currentUser } = useContext(AuthContext);
  const [client, setClient] = useState<Client | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      currentUser
        .getIdToken()
        .then((token) => setToken(token))
        .catch((err) => console.log(err));
    }
  }, [currentUser]);

  useEffect(() => {
    const client = new Client({
      url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
      exchanges: [cacheExchange, fetchExchange],
      fetchOptions: () => {
        return {
          headers: { authorization: token ? `Bearer ${token}` : '' },
        };
      },
    });
    setClient(client);
  }, [token]);

  return (
    <UrqlContext.Provider value={{ client }}>{children}</UrqlContext.Provider>
  );
};
