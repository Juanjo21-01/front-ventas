import React, { useState } from 'react';

const CompraModal = ({ compra, Cerrar, Guardar }) => {
  const [DatosForm, ActualizarForm] = useState({ ...compra });

  const Cambios = (e) => {
    const { name, value } = e.target;
    ActualizarForm((DatosPrevios) => ({
      ...DatosPrevios,
      [name]: value,
    }));
  };

  const GuardarDatos = () => {
    Guardar(DatosForm);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Editar Compra</h3>

        <div className="form-control">
          <label className="label">ID</label>
          <input
            type="text"
            name="id"
            value={DatosForm.id}
            onChange={Cambios}
            className="input input-bordered"
            disabled
          />

          <label className="label">Fecha de Compra</label>
          <input
            type="date"
            name="fecha_compra"
            value={DatosForm.fecha_compra}
            onChange={Cambios}
            className="input input-bordered"
          />

          <label className="label">Estado</label>
          <input
            type="text"
            name="estado"
            value={DatosForm.estado}
            onChange={Cambios}
            className="input input-bordered"
          />

          <label className="label">Observaciones</label>
          <textarea
            name="observaciones"
            value={DatosForm.observaciones}
            onChange={Cambios}
            className="textarea textarea-bordered"
          ></textarea>

          <label className="label">Proveedor ID</label>
          <input
            type="number"
            name="proveedor_id"
            value={DatosForm.proveedor_id}
            onChange={Cambios}
            className="input input-bordered"
          />

          <label className="label">Usuario ID</label>
          <input
            type="number"
            name="usuario_id"
            value={DatosForm.usuario_id}
            onChange={Cambios}
            className="input input-bordered"
          />
        </div>

        <div className="modal-action">
          <button className="btn" onClick={Cerrar}>Cancelar</button>
          <button className="btn primary-theme" onClick={GuardarDatos}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default CompraModal;
