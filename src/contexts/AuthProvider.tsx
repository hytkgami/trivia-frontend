import { Auth, getAuth, GoogleAuthProvider, signInWithRedirect, User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Spinner } from '../components/Spinner';
import { Main } from '../pages/Main';

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
  if (!currentUser)
    return (
      <div>
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-0 py-2 text-sm font-medium tracking-wide">
                    🧠 Trivia
                  </span>
                </div>
              </div>
              <div className="flex-shrink justify-end">
                <a
                  href="#"
                  onClick={() => {
                    try {
                      signInWithRedirect(getAuth(), new GoogleAuthProvider())
                        .then(() => {
                          setLoading(false);
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-0 py-2 text-sm font-medium tracking-wide"
                >
                  サインインして始める
                </a>
              </div>
            </div>
          </div>
        </nav>
        <Main />
        {loading && (
          <div className="w-full h-full flex absolute bg-gray-900 opacity-80 z-50 top-0 left-0">
            <div className="flex items-center gap-2 m-auto">
              <Spinner />
              <p className="text-white text-xl">処理中</p>
            </div>
          </div>
        )}
      </div>
    );
  return <AuthContext.Provider value={{ currentUser, loading }}>{children}</AuthContext.Provider>;
};
