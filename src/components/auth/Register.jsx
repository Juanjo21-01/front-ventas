import { useState } from 'react';
import { register } from '../../helpers/api/auth';
import { useNavigate } from 'react-router-dom';

const styleInput =
  'input input-bordered w-full bg-theme bg-theme-hover secondary-theme placeholder: primary-theme';
const styleLabel = 'label label-text text-theme';

const styleBtn = 'btn primary-theme w-full mt-4';

const styleCard =
  'card bg-theme-secondary w-full max-w-md shadow-xl p-6 border primary-theme';

export const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    direccion: '',
    telefono: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    register(formData);

    setFormData({
      nombres: '',
      apellidos: '',
      email: '',
      direccion: '',
      telefono: '',
      password: '',
    });

    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center mt-0 sm:mt-12 p-4 h-screen">
      <div className={styleCard}>
        <h2 className="text-2xl primary-theme font-bold text-center mb-4 border-b-2 pb-2">
          Registro
        </h2>

        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="nombre">
                <span className={styleLabel}>Nombres</span>
              </label>
              <input
                type="text"
                name="nombres"
                placeholder="Nombres"
                id="nombre"
                className={styleInput}
                required
                value={formData.nombres}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="apellidos">
                <span className={styleLabel}>Apellidos</span>
              </label>
              <input
                id="apellidos"
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                className={styleInput}
                required
                value={formData.apellidos}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="direction">
                <span className={styleLabel}>Dirección</span>
              </label>
              <input
                id="direction"
                type="text"
                name="direccion"
                placeholder="Dirección"
                className={styleInput}
                required
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="numberPhone">
                <span className={styleLabel}>Teléfono</span>
              </label>
              <input
                id="numberPhone"
                type="number"
                name="telefono"
                placeholder="Teléfono"
                className={styleInput}
                required
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <button className={styleBtn + ' primary-theme'}>Next</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className={styleLabel}>Correo</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Correo"
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

            <div className="form-control gap-3 grid grid-cols-2"> {/* Usar grid para distribuir mejor los botones */}
              <button type="submit" className={styleBtn + ' secondary-theme'}>
                Registrar
              </button>
              <button
                onClick={handlePrevious}
                className={styleBtn + ' primary-theme'}
              >
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
