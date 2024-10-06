import { useState } from "react";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    // validación
    console.log("Datos del formulario de login:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-gray-700 w-96 shadow-xl p-6">
        <h2 className="text-2xl text-gray-100 font-bold text-center mb-4 border-b-2 pb-2">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text text-gray-300">Email</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text text-gray-300">Contraseña</span>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Contraseña"
              className="input input-bordered w-full"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary w-full mt-4">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};