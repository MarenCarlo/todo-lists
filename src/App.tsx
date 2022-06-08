import React from 'react';
// Router Imports
import {
  Routes,
  Route
} from "react-router-dom";
// Components Imports
import Login from './components/auth/Login';
import Error404 from './components/errors/Error404';
// Styles Imports
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from './Theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <Routes>
          <Route path="/" element={
            <Login />
          } />
          <Route path="/resource_not_found" element={<Error404 />} />
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;
