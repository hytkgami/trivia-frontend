import { useSignOut } from '../hooks/useSignOut';
import { Spinner } from './Spinner';

interface Props {
  afterOnClick?: () => void;
  className?: string;
}

export const SignOutButton = (props: Props) => {
  const { signOut, loading } = useSignOut();
  return (
    <>
      <button
        onClick={async () => {
          try {
            await signOut();
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
        {loading ? <Spinner /> : 'Sign out'}
      </button>
    </>
  );
};
