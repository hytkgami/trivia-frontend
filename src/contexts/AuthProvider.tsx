import { Auth, getAuth, User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface ContextProps {
  currentUser: User | null;
  loading: boolean;
}

export const AuthContext = createContext<ContextProps>({
  currentUser: null,
  loading: true,
});

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    if (auth === null) {
      setAuth(getAuth());
    }
  }, [auth]);

  useEffect(() => {
    if (auth) {
      auth.onAuthStateChanged((user) => {
        setLoading(true);
        setCurrentUser(user);
        setLoading(false);
      });
    }
  }, [auth]);
  return <AuthContext.Provider value={{ currentUser, loading }}>{children}</AuthContext.Provider>;
};
