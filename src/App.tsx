import { NavBar } from './components/NavBar';
import { GraphQLClientProvider } from './contexts/ApolloProvider';
import { AuthProvider } from './contexts/AuthProvider';
import './lib/firebase';
import { LobbiesPage } from './pages/Lobbies';
import { LobbyPage } from './pages/Lobby';

function App() {
  return (
    <>
      <AuthProvider>
        <GraphQLClientProvider>
          <NavBar />
          <LobbiesPage />
          <LobbyPage />
        </GraphQLClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
