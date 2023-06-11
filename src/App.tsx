import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { GraphQLClientProvider } from './contexts/ApolloProvider';
import { AuthProvider } from './contexts/AuthProvider';
import './lib/firebase';
import { LobbiesPage } from './pages/Lobbies';
import { LobbyPage } from './pages/Lobby';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <GraphQLClientProvider>
            <NavBar />
            <Routes>
              <Route path="/lobbies" element={<LobbiesPage />} />
              <Route path='/lobbies/:id' element={<LobbyPage />}>
              </Route>
            </Routes>
          </GraphQLClientProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
