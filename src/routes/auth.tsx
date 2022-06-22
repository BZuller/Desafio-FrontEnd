import React from 'react';
import { Navigate } from 'react-router-dom';

interface IPrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivateRouteProps): React.ReactElement => {
  const token = localStorage.getItem('userToken');

  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
