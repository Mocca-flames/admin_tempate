import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import '../styles/Modal.css';

/**
 * MODAL COMPONENT
 * Overlay dialog component with customizable content
 *
 * Props:
 * - isOpen: boolean
 * - onClose: function
 * - title: string
 * - children: ReactNode
 * - size: 'sm' | 'md' | 'lg' | 'xl'
 * - showCloseButton: boolean
 * - closeOnOverlayClick: boolean
 * - actions: array of action objects { label, onClick, variant, disabled }
 */

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  actions = [],
  className = ''
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const modalClasses = [
    'modal-overlay',
    className
  ].filter(Boolean).join(' ');

  const modalClassesInner = [
    'modal',
    `modal-${size}`
  ].join(' ');

  return createPortal(
    <div className={modalClasses} onClick={handleOverlayClick}>
      <div className={modalClassesInner}>
        {(title || showCloseButton) && (
          <div className="modal-header">
            {title && <h2 className="modal-title">{title}</h2>}
            {showCloseButton && (
              <button
                className="modal-close"
                onClick={onClose}
                aria-label="Close modal"
              >
                ×
              </button>
            )}
          </div>
        )}

        <div className="modal-body">
          {children}
        </div>

        {actions.length > 0 && (
          <div className="modal-footer">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'secondary'}
                onClick={action.onClick}
                disabled={action.disabled}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;