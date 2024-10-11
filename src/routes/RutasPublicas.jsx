import { Navigate, Outlet } from 'react-router-dom';

export const RutasPublicas = () => {
  const session = true;

  return session ? <Navigate to="/dashboard" /> : <Outlet />;
};
