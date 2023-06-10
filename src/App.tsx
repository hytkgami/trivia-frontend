import { NavBar } from './components/NavBar';
import { AuthProvider } from './contexts/AuthProvider';
import { UrqlProvier } from './contexts/UrqlProvider';
import './lib/firebase';

function App() {
  return (
    <>
      <AuthProvider>
        <UrqlProvier>
          <NavBar />
          <div></div>
        </UrqlProvier>
      </AuthProvider>
    </>
  );
}

export default App;
