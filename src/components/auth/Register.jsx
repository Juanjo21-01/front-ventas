import { useState } from "react";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
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
    // Conexión a base de datos 
    console.log("Datos del formulario:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-gray-700 w-96 shadow-xl p-6">
        <h2 className="text-2xl text-gray-100 font-bold text-center mb-4 border-b-2 pb-2">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="nombre">
              <span className="label-text">Nombres</span>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Nombres"
              id="nombre"
              className="input input-bordered w-full"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="apellidos">
              <span className="label-text">Apellidos</span>
            </label>
            <input
              id="apellidos"
              type="text"
              name="lastName"
              placeholder="Apellidos"
              className="input input-bordered w-full"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
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
            <label className="label" htmlFor="direction">
              <span className="label-text">Dirección</span>
            </label>
            <input
              id="direction"
              type="text"
              name="address"
              placeholder="Dirección"
              className="input input-bordered w-full"
              required
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="numberPhone">
              <span className="label-text">Teléfono</span>
            </label>
            <input
              id="numberPhone"
              type="tel"
              name="phone"
              placeholder="Teléfono"
              className="input input-bordered w-full"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary w-full mt-4">Registrar</button>
        </form>
      </div>
    </div>
  );
};