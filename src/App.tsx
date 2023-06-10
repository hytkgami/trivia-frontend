import { NavBar } from './components/NavBar';
import { AuthProvider } from './contexts/AuthProvider';
import './lib/firebase';

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <div></div>
      </AuthProvider>
    </>
  );
}

export default App;
