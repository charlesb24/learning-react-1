import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

export default function Modal({ open, onClose, className = '', children }) {
  const modal = useRef();

  useEffect(() => {
    const dialog = modal.current;

    if (open) {
      dialog.showModal();
    }

    return () => dialog.close();
  }, [open]);

  return createPortal((
    <dialog ref={modal} className={`modal ${className}`} onClose={onClose}>
      { children }
    </dialog>
  ), document.getElementById('modal'));
}