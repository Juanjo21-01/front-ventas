// AlertModal.js
import React from 'react';

const AlertModal = ({ isOpen, onClose, onConfirm, entity, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
        <div role="alert" className="alert alert-warning flex items-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-yellow-400 mr-3"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="font-semibold text-black">
            {message} <span className="font-bold">{entity.nombre || entity.nombres} {entity.apellido || entity.apellidos}</span>?
          </span>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
            onClick={() => {
              onConfirm(entity.id);
              onClose();
            }}
          >
            Confirmar
          </button>
          <button
            className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
