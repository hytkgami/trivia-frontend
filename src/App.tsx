import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { GraphQLClientProvider } from './contexts/ApolloProvider';
import { AuthProvider } from './contexts/AuthProvider';
import './lib/firebase';
import { LobbiesPage } from './pages/Lobbies';
import { LobbyPage } from './pages/Lobby';
import { AdminLobby } from './pages/admin/Lobby';
import { Main } from './pages/Main';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <GraphQLClientProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/lobbies" element={<LobbiesPage />} />
              <Route path="/lobbies/:id" element={<LobbyPage />} />
              <Route path="/me/lobbies/:id" element={<AdminLobby />} />
            </Routes>
          </GraphQLClientProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
