import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200 border border-slate-100">
        <h3 className="text-2xl font-black text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">{message}</p>
        <div className="flex gap-4">
          <Button onClick={onCancel} variant="secondary" className="flex-1">
            {cancelText}
          </Button>
          <Button onClick={onConfirm} variant="destructive" className="flex-1">
            {confirmText}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export { ConfirmDialog };
