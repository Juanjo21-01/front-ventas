import { useState } from "react";

const styleInput = "input input-bordered w-full bg-theme bg-theme-hover secondary-theme placeholder: primary-theme";

const styleLabel = "label-text text-theme";

const styleBtn = "btn btn-primary w-full mt-4";

const styleCard = "card bg-theme-secondary w-96 shadow-xl p-6  border primary-theme";

export const RegisterForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailReg: "",
    address: "",
    phone: "",
    password: ""
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
    console.log("Datos del formulario:", formData);

    setStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      emailReg: "",
      address: "",
      phone: "",
      password: ""
    });
};

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className={styleCard}>
        <h2 className="text-2xl primary-theme font-bold text-center mb-4 border-b-2 pb-2">Registro</h2>

        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="nombre">
                <span className={styleLabel}>Nombres</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Nombres"
                id="nombre"
                className={styleInput}
                required
                value={formData.firstName}
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
                name="lastName"
                placeholder="Apellidos"
                className={styleInput}
                required
                value={formData.lastName}
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
                name="address"
                placeholder="Dirección"
                className={styleInput}
                required
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="numberPhone">
                <span className={styleLabel}>Teléfono</span>
              </label>
              <input
                id="numberPhone"
                type="tel"
                name="phone"
                placeholder="Teléfono"
                className={styleInput}
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <button className={styleBtn+" primary-theme"}>Next</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="emailReg">
                <span className={styleLabel}>Correo</span>
              </label>
              <input
                id="emailReg"
                type="emailReg"
                name="emailReg"
                placeholder="Correo"
                className={styleInput}
                required
                value={formData.emailReg}
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

            <div  className="form-control gap-3">
              <button onClick={handlePrevious} className={styleBtn+" primary-theme"}>
                Back
              </button>
              <button type="submit" className={styleBtn+" secondary-theme"}>
                Registrar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};