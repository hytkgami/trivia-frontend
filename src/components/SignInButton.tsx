import { useSignInWithGoogle } from '../hooks/useSignInWithGoogle';
import { Spinner } from './Spinner';

interface Props {
  afterOnClick?: () => void;
  className?: string;
}

export const SignInWithGoogleButton = (props: Props) => {
  const { signinWithGoogle, loading } = useSignInWithGoogle();
  return (
    <>
      <button
        onClick={async () => {
          try {
            await signinWithGoogle();
          } catch (error) {
            console.error(error);
          }
          props.afterOnClick?.();
        }}
        role="menuitem"
        tabIndex={-1}
        disabled={loading}
        className={'block px-4 py-2 text-sm ' + props.className}
      >
        {loading ? <Spinner /> : 'Sign in with Google'}
      </button>
    </>
  );
};
