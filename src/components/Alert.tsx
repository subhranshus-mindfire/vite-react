import React from 'react';
import { useAlert } from '../context/AlertContext';

const Alert: React.FC = () => {
  const { message, visible } = useAlert();

  if (!visible) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] px-5 py-3 text-white text-base rounded bg-green-600 shadow-md animate-slideDown">
      {message}
    </div>
  );
};

export default Alert;
