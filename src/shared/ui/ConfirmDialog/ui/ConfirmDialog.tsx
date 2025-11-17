import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import cn from "./ConfirmDialog.module.css";
import { useTheme } from "shared/ui/Theme";
import classNames from "classnames";

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
  const { theme } = useTheme();

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
    <div className={cn.overlay} onClick={handleOverlayClick}>
      <div className={classNames(cn.dialog, cn[`dialog-${theme}`])}>
        <div className={cn.content}>
          <h2>{title}</h2>
          <p>{description}</p>
          <div className={cn.actions}>
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
