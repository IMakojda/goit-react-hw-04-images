import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root')

export default function Modal({ children, onClose }) {

  useEffect(() => {
    window.addEventListener('keydown', handleKepDown);
    return () => {
      window.removeEventListener('keydown', handleKepDown);
    };
  });

  const handleKepDown = e => {
    if (e.code === "Escape") {
      onClose();
    }
  }

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return createPortal(
    <div className="overlay" onClick={handleBackDropClick}>
      <div className="modal">
        {children}
      </div>
    </div>,
    modalRoot
  )
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};