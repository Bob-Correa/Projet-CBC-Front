import './ModalConfirmation.css';

export default function ModalConfirmation({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{message}</h3>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}
