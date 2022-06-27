import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface IPrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivateRouteProps): React.ReactElement => {
  const { token } = useContext(AuthContext);

  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
