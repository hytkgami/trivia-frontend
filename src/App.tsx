import { NavBar } from './components/NavBar';
import { GraphQLClientProvider } from './contexts/ApolloProvider';
import { AuthProvider } from './contexts/AuthProvider';
import './lib/firebase';
import { LobbyPage } from './pages/Lobby';

function App() {
  return (
    <>
      <AuthProvider>
        <GraphQLClientProvider>
          <NavBar />
          <LobbyPage />
        </GraphQLClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
