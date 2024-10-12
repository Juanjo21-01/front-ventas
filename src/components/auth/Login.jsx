import { useState } from "react";

const styleInput = "input input-bordered w-full bg-theme bg-theme-hover secondary-theme placeholder: primary-theme";

const styleLabel = "label label-text text-theme";

const styleBtn = "btn btn-primary w-full mt-4";

const styleCard = "card bg-theme-secondary w-96 shadow-xl p-6  border primary-theme";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    emailLog: "",
    passwordLog: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario de login:", formData);

    setFormData({
        emailLog: "",
        passwordLog: ""
      })
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className={styleCard}>
        <h2 className="text-2xl primary-theme font-bold text-center mb-4 border-b-2 pb-2">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="emailLog">
              <span className={styleLabel}>Email</span>
            </label>
            <input
              id="emailLog"
              type="emailLog"
              name="emailLog"
              placeholder="Email"
              className={styleInput}
              required
              value={formData.emailLog}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="passwordLog">
              <span className={styleLabel}>Contraseña</span>
            </label>
            <input
              id="passwordLog"
              type="passwordLog"
              name="passwordLog"
              placeholder="Contraseña"
              className={styleInput}
              required
              value={formData.passwordLog}
              onChange={handleChange}
            />
          </div>

          <button className={styleBtn+" primary-theme"}>Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};