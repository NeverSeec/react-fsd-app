import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./ConfirmDialog.module.css";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: (result: boolean) => void;
  title: string;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(false);
    }
  };

  const handleConfirm = () => {
    onClose(true);
    onConfirm?.();
  };

  const handleCancel = () => {
    onClose(false);
    onCancel?.();
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.dialog}>
        <div className={styles.content}>
          <h2>{title}</h2>
          <p>{description}</p>
          <div className={styles.actions}>
            <button onClick={handleCancel} autoFocus>
              Отмена
            </button>
            <button onClick={handleConfirm}>Подтвердить</button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
