import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute: React.FC = () => {
  //  Authentication Logic
  const jwtToken = Cookies.get('jwtToken');

  /*
 const isAuthenticated = !jwtToken ? true : false;
*/

  if (!jwtToken) {
    return <Navigate to="/signin" />;
  }
  return (
    // Open the Outlet
    <Outlet />
  );
};

export default ProtectedRoute;
