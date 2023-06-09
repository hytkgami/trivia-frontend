import { useContext, useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import { AuthContext, AuthProvider } from './contexts/AuthProvider';
import './lib/firebase';
import viteLogo from '/vite.svg';
import { Button } from './components/Button';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <AuthProvider>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
          <Button
              title="Sign in"
              key={"sign-in"}
              onClick={() => {
                const provider = new GoogleAuthProvider();
                signInWithRedirect(getAuth(), provider)
                  .then(() => {
                    console.log('Signed in');
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }}
            />
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </AuthProvider>
    </>
  );
}

export default App;
