import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUsuariosStore } from '../../store/usuarios';
import { getUsuarioById } from '../../helpers/api/usuarios/usuarios';

export const DetallesUsuario = () => {
  const { id } = useParams();
  const { actualizar } = useUsuariosStore();
  const [usuario, setUsuario] = useState(null);
  const [editMode, setEditMode] = useState({
    nombres: false,
    apellidos: false,
    email: false,
    password: false,
    direccion: false,
    telefono: false,
  });

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    direccion: '',
    telefono: '',
  });

  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    const cargarUsuario = async () => {
      const data = await getUsuarioById(id);
      if (data) {
        setUsuario(data);
        setFormData({
          nombres: data.nombres,
          apellidos: data.apellidos,
          email: data.email,
          password: '', 
          direccion: data.direccion,
          telefono: data.telefono,
        });
        setOriginalData(data);
      }
    };
    cargarUsuario();
  }, [id]);

  const handleChange = (e) => {e
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (field) => {
    try {
      await actualizar(id, formData);
      setEditMode({ ...editMode, [field]: false });
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
    }
  };

  const handleCancel = (field) => {
    setFormData({ ...formData, [field]: originalData[field] }); // Restaurar valor original
    setEditMode({ ...editMode, [field]: false }); // Salir del modo de edición
  };

  const isEditing = (field) => editMode[field];

  if (!usuario) {
    return <div className='h-full flex flex-col justify-center items-center'>
      <span className="loading loading-infinity loading-lg"></span>
      <span className='text-2xl'>Cargando...</span>
    </div>;
  }

  const styleInput = 'input input-bordered bg-theme bg-theme-hover primary-theme placeholder:primary-theme';
  const styleLabel = 'label label-text secondary-theme text-xl';

  const styleGridContainer = `grid grid-cols-1 gap-4 items-center`;
  
  return (
    <div className="container px-4 sm:w-11/12 m-auto">
      <h2 className="title text-2xl mb-4">Perfil de Usuario</h2>
  
      <div className={styleGridContainer + ' md:grid-cols-2'}>
        <div className='border-b-2'>
          <label className={styleLabel}>Nombre:
          {editMode.nombres ? (
            <input
              type="text"
              name="nombres"
              placeholder="..."
              value={formData.nombres}
              onChange={handleChange}
              className={styleInput}
            />
          ) : (
            <p className='text-theme'>{formData.nombres}</p>
          )}
          </label>
        </div>
        <div className={`${isEditing('nombres') ? 'md:grid-cols-2' : 'md:grid-cols-1'} ${styleGridContainer}`}>
          <button
            className={`btn primary-theme mt-1 md:mt-0`}
            onClick={() => editMode.nombres ? handleSave('nombres') : setEditMode({ ...editMode, nombres: true })}
          >
            {editMode.nombres ? 'Guardar' : 'Editar'}
          </button>
          {editMode.nombres && (
            <button
              className="btn error-theme"
              onClick={() => handleCancel('nombres')}
            >
              Cancelar
            </button>
          )}
        </div>
  
        <div className='border-b-2'>
          <label className={styleLabel}>Apellidos:
          {editMode.apellidos ? (
            <input
              type="text"
              name="apellidos"
              placeholder="..."
              value={formData.apellidos}
              onChange={handleChange}
              className={styleInput}
            />
          ) : (
            <p className='text-theme'>{formData.apellidos}</p>
          )}
          </label>
        </div>
        <div className={`${styleGridContainer}  ${editMode.apellidos ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
          <button
            className={`btn primary-theme mt-1 md:mt-0`}
            onClick={() => editMode.apellidos ? handleSave('apellidos') : setEditMode({ ...editMode, apellidos: true })}
          >
            {editMode.apellidos ? 'Guardar' : 'Editar'}
          </button>
          {editMode.apellidos && (
            <button
              className="btn error-theme"
              onClick={() => handleCancel('apellidos')}
            >
              Cancelar
            </button>
          )}
        </div>
  
        <div className='border-b-2'>
          <label className={styleLabel}>Email:
          {editMode.email ? (
            <input
              type="email"
              name="email"
              placeholder="..."
              value={formData.email}
              onChange={handleChange}
              className={styleInput}
            />
          ) : (
            <p className='text-theme'>{formData.email}</p>
          )}
          </label>
        </div>
        <div className={`${styleGridContainer}  ${editMode.email ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
          <button
            className={`btn primary-theme mt-1 md:mt-0`}
            onClick={() => editMode.email ? handleSave('email') : setEditMode({ ...editMode, email: true })}
          >
            {editMode.email ? 'Guardar' : 'Editar'}
          </button>
          {editMode.email && (
            <button
              className="btn error-theme"
              onClick={() => handleCancel('email')}
            >
              Cancelar
            </button>
          )}
        </div>
  
        <div className='border-b-2'>
          <label className={styleLabel}>Contraseña:
          {editMode.password ? (
            <input
              type="password"
              name="password"
              placeholder="..."
              value={formData.password}
              onChange={handleChange}
              className={styleInput}
            />
          ) : (
            <p className='text-theme'>********</p>
          )}
          </label>
        </div>
        <div className={`${styleGridContainer}  ${editMode.password ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
          <button
            className={`btn primary-theme mt-1 md:mt-0`}
            onClick={() => editMode.password ? handleSave('password') : setEditMode({ ...editMode, password: true })}
          >
            {editMode.password ? 'Guardar' : 'Editar'}
          </button>
          {editMode.password && (
            <button
              className="btn error-theme"
              onClick={() => handleCancel('password')}
            >
              Cancelar
            </button>
          )}
        </div>
  
        <div className='border-b-2'>
          <label className={styleLabel}>Dirección:
          {editMode.direccion ? (
            <input
              type="text"
              name="direccion"
              placeholder="..."
              value={formData.direccion}
              onChange={handleChange}
              className={styleInput}
            />
          ) : (
            <p className='text-theme'>{formData.direccion}</p>
          )}
          </label>
        </div>
        <div className={`${styleGridContainer}  ${editMode.direccion ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
          <button
            className={`btn primary-theme mt-1 md:mt-0`}
            onClick={() => editMode.direccion ? handleSave('direccion') : setEditMode({ ...editMode, direccion: true })}
          >
            {editMode.direccion ? 'Guardar' : 'Editar'}
          </button>
          {editMode.direccion && (
            <button
              className="btn error-theme"
              onClick={() => handleCancel('direccion')}
            >
              Cancelar
            </button>
          )}
        </div>
  
        <div className='border-b-2'>
          <label className={styleLabel}>Teléfono:
          {editMode.telefono ? (
            <input
              type="text"
              name="telefono"
              placeholder="..."
              value={formData.telefono}
              onChange={handleChange}
              className={styleInput}
            />
          ) : (
            <p className='text-theme'>{formData.telefono}</p>
          )}
          </label>
        </div>
        <div className={`${styleGridContainer}  ${editMode.telefono ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
          <button
            className={`btn primary-theme mt-1 md:mt-0`}
            onClick={() => editMode.telefono ? handleSave('telefono') : setEditMode({ ...editMode, telefono: true })}
          >
            {editMode.telefono ? 'Guardar' : 'Editar'}
          </button>
          {editMode.telefono && (
            <button
              className="btn error-theme"
              onClick={() => handleCancel('telefono')}
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};