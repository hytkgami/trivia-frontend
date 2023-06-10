import { getAuth } from 'firebase/auth';
import { useState } from 'react';

export const useSignOut = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const signOut = () => {
    setLoading(true);
    return getAuth()
      .signOut()
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
    signOut,
    loading,
    error,
  };
};
