import { CgDanger } from "react-icons/cg";

// eslint-disable-next-line react/prop-types
const AlertModal = ({ isOpen, onClose, onConfirm, entityDisplayName, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 rounded-lg shadow-xl max-w-sm w-full">
        <div role="alert" className="alert alert-warning flex justify-center text-center items-center primary-theme error-theme bg-theme-secondary flex-col">
        <CgDanger size={100} />
          <span className="font-semibold">

            {message} <span className="font-bold">{entityDisplayName}</span>?
          </span>
          <div className="mt-6 flex justify-end space-x-3">
          <button
            className="btn secondary-theme font-semibold py-2 px-4 rounded-lg transition duration-200"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirmar
          </button>
          <button
            className="btn error-theme font-semibold py-2 px-4 rounded-lg transition duration-200"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
