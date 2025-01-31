import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg
      ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
      {type === 'success' ? (
        <CheckCircle size={20} className="text-white" />
      ) : (
        <AlertCircle size={20} className="text-white" />
      )}
      <p className="text-white">{message}</p>
      <button onClick={onClose} className="text-white hover:text-gray-200">
        <X size={20} />
      </button>
    </div>
  );
}