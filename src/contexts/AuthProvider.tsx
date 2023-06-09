import { Auth, getAuth, User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

type State = User | null;
type ContextProps = {
  currentUser: State;
};
const AuthContext = createContext<ContextProps>({ currentUser: null });

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<State>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    if (auth === null) {
      setAuth(getAuth());
    }
  }, [auth]);

  useEffect(() => {
    if (auth) {
      auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
      });
    }
  }, [auth]);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
