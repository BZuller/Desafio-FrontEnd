import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import Login from '../pages/Login';
import List from '../pages/Users/List';
import Actions from '../pages/Users/Acoes';
import PrivateRoute from './auth';

function Routes(): React.ReactElement {
  return (
    <ReactRoutes>
      <Route path="/" element={<Login />} />
      <Route
        path="/List"
        element={
          <PrivateRoute>
            <List />
          </PrivateRoute>
        }
      />
      <Route
        path="/Actions"
        element={
          <PrivateRoute>
            <Actions />
          </PrivateRoute>
        }
      />
      <Route
        path="/Actions/:id"
        element={
          <PrivateRoute>
            <Actions />
          </PrivateRoute>
        }
      />
    </ReactRoutes>
  );
}
export default Routes;
