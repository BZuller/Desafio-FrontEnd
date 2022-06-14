import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToggleMenuProvider } from './contexts/ToggleMenuContext';
import Routes from './routes/routes';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FunctionComponent = () => (
  <BrowserRouter>
    <AuthProvider>
      <ToggleMenuProvider>
        <Routes />
      </ToggleMenuProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
