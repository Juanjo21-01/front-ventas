import { NavLink } from 'react-router-dom';
import { Loader } from './Loader';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-base-content">
      <h1 className="text-9xl font-bold text-center mb-4 error-theme">404</h1>
      <p className="text-xl text-center mb-6 secondary-theme">Página no encontrada</p>
      <div className='mb-4'>
        <Loader />
      </div>
      <NavLink to="/" className="btn primary-theme">
        Volver al Inicio
      </NavLink>
    </div>
  );
}

export default NotFoundPage;
