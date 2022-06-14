import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import List from '../pages/Users/List';
import Actions from '../pages/Users/Acoes';

function Routes(): React.ReactElement {
  return (
    <ReactRoutes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/List" element={<List />} />
      <Route path="/Actions" element={<Actions />} />
      <Route path="/Actions/:id" element={<Actions />} />
    </ReactRoutes>
  );
}
export default Routes;
