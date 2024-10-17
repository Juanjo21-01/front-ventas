import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export const RutasPublicas = () => {
  const logged = useAuthStore((state) => state.logged);
  return logged ? <Navigate to="/dashboard" /> : <Outlet />;
};
