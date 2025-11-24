import { useState, useCallback } from "react";
import { ConfirmDialog } from "../ui/ConfirmDialog.tsx";

interface ConfirmDialogOptions {
  title: string;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<ConfirmDialogOptions>({
    title: "",
    description: "",
  });
  const [resolvePromise, setResolvePromise] = useState<
    ((value: boolean) => void) | null
  >(null);

  const showConfirmDialog = useCallback(
    (options: ConfirmDialogOptions): Promise<boolean> => {
      return new Promise((resolve) => {
        setDialogProps(options);
        setIsOpen(true);
        setResolvePromise(() => resolve);
      });
    },
    [],
  );

  const onClose = useCallback(
    (result: boolean) => {
      setIsOpen(false);
      if (resolvePromise) {
        resolvePromise(result);
        setResolvePromise(null);
      }
    },
    [resolvePromise],
  );

  const DialogComponent = (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title={dialogProps.title}
      description={dialogProps.description}
      onConfirm={dialogProps.onConfirm}
      onCancel={dialogProps.onCancel}
    />
  );

  return {
    showConfirmDialog,
    ConfirmDialog: DialogComponent,
  };
};
