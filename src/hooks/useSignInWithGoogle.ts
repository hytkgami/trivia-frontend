import { GoogleAuthProvider, getAuth, signInWithRedirect } from 'firebase/auth';
import { useState } from 'react';

export const useSignInWithGoogle = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const signinWithGoogle = () => {
    setLoading(true);
    return signInWithRedirect(getAuth(), new GoogleAuthProvider())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [error, setError] = useState<Error>();
  return {
    signinWithGoogle,
    loading,
    error,
  };
};
