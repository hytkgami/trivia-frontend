import { SignInWithGoogleButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';
import { Spinner } from './Spinner';
import { graphql } from '../generated';
import { useMutation } from '@apollo/client';
import { useContext, useEffect, useReducer } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Link } from 'react-router-dom';

const SignInMutationDocument = graphql(`
  mutation SignIn($name: String!) {
    signin(name: $name) {
      user {
        id
        name
      }
    }
  }
`);

export const NavBar = () => {
  const [toggleIsOpen, toggle] = useReducer(
    (toggleIsOpen) => !toggleIsOpen,
    false
  );
  const { currentUser, loading } = useContext(AuthContext);
  const [signIn, { loading: signInLoading }] = useMutation(
    SignInMutationDocument
  );
  useEffect(() => {
    async () => {
      if (currentUser !== null) {
        await signIn({
          variables: {
            name: currentUser.displayName ?? currentUser.email ?? 'noname',
          },
        });
      }
    };
  }, [currentUser, signIn]);
  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-0 py-2 text-sm font-medium tracking-wide"
                >
                  🧠 Trivia
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/lobbies"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Lobbies
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {loading || signInLoading ? (
                  <Spinner />
                ) : (
                  <div className="relative ml-3">
                    {currentUser ? (
                      <div>
                        <button
                          type="button"
                          onClick={toggle}
                          className="flex max-w-xs gap-2 items-center rounded-full bg-gray-800 text-sm focus:outline-none"
                          id="user-menu-button"
                          aria-expanded="false"
                          aria-haspopup="true"
                        >
                          <img
                            className="h-8 w-8 rounded-full"
                            src={currentUser.photoURL || undefined}
                            alt={`${currentUser.displayName}'s photo'`}
                          />
                          <p className="text-gray-300">
                            {currentUser.displayName}
                          </p>
                        </button>
                      </div>
                    ) : (
                      <SignInWithGoogleButton
                        afterOnClick={toggle}
                        className="text-white"
                      />
                    )}
                    {toggleIsOpen ? (
                      <div
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        hidden={!toggleIsOpen}
                        tabIndex={-1}
                      >
                        <SignOutButton afterOnClick={toggle} />
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                onClick={toggle}
                className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu" hidden={!toggleIsOpen}>
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              to="/lobbies"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Lobbies
            </Link>
          </div>
          {loading || signInLoading ? (
            <Spinner />
          ) : currentUser ? (
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={currentUser.photoURL || undefined}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {currentUser.displayName}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {currentUser.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <SignOutButton className="text-white" afterOnClick={toggle} />
              </div>
            </div>
          ) : (
            <SignInWithGoogleButton
              afterOnClick={toggle}
              className="text-white"
            />
          )}
        </div>
      </nav>
    </>
  );
};
