import { useState } from 'react';
import { login } from '../../helpers/api/auth';
import { useAuthStore } from '../../store/auth';

const styleInput =
  'input input-bordered w-full bg-theme bg-theme-hover secondary-theme placeholder: primary-theme';

const styleLabel = 'label label-text text-theme';

const styleBtn = 'btn primary-theme w-full mt-4';

const styleCard =
  'card bg-theme-secondary w-96 shadow-xl p-6 border primary-theme';

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { mensaje, access_token, usuario } = await login(formData);

    setToken(access_token);
    setProfile(usuario);

    return mensaje;
  };

  return (
    <div className="flex justify-center items-center p-4 h-full">
      <div className={styleCard}>
        <h2 className="text-2xl primary-theme font-bold text-center mb-4 border-b-2 pb-2">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className={styleLabel}>Email</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              className={styleInput}
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className={styleLabel}>Contraseña</span>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Contraseña"
              className={styleInput}
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button className={styleBtn + ' primary-theme'}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};
