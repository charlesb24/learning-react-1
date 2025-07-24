import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

export default function Modal({ open, className = '', children }) {
  const modal = useRef();

  useEffect(() => {
    const dialog = modal.current;

    if (open) {
      dialog.showModal();
    }

    return () => dialog.close();
  }, [open]);

  return createPortal((
    <dialog ref={modal} className={`modal ${className}`}>
      { children }
    </dialog>
  ), document.getElementById('modal'));
}