import { Navigate, Outlet } from 'react-router-dom';

export const RutasPrivadas = () => {
  const session = true;

  return session ?  <Outlet /> : <Navigate to='/login' />;
};
