import React from 'react';
import { useAlert } from '../context/AlertContext';

const Alert: React.FC = () => {
  const { message, visible } = useAlert();

  if (!visible) return null;

  return (
    <div className="custom-alert success show">
      {message}
    </div>
  );
};

export default Alert;
