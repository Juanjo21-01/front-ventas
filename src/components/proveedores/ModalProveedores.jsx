/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useProveedoresStore } from '../../store/proveedores';

const initialForm = {
  id: null,
  nombre: '',
  nit: '',
  direccion: '',
  telefono: '',
  estado: true,
};

const ModalProveedores = ({ abrir, cerrar, editar }) => {
  const { crear, actualizar } = useProveedoresStore();
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editar) {
      setForm(editar);
    } else {
      setForm(initialForm);
    }
  }, [editar]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id === null) {
      await crear(form);
    } else {
      await actualizar(editar.id, form);
    }
    handleReset();
    cerrar();
  };

  const handleReset = () => {
    console.log(form);

    setForm(initialForm);

    console.log(form);

    cerrar();
  };

  if (!abrir) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          onClick={cerrar}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold ">
          {form.id ? 'Editar Proveedor' : 'Agregar Proveedor'}
        </h3>
        <form onSubmit={handleSubmit}>
          {/* nombre */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre</span>
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          {/* nit */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nit</span>
            </label>
            <input
              type="text"
              name="nit"
              value={form.nit}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          {/* direccion */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Dirección</span>
            </label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          {/* telefono */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Teléfono</span>
            </label>
            <input
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          {/* estado */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Estado</span>
            </label>
            <input
              type="text"
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <button type="reset" onClick={handleReset} className="btn">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProveedores;
