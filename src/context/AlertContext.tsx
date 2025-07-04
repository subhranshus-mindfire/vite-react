// context/AlertContext.tsx
import React, { createContext, useState, useContext, useCallback } from 'react';

interface AlertState {
  message: string;
  visible: boolean;
  showAlert: (msg: string) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertState | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showAlert = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }, []);

  const hideAlert = () => setVisible(false);

  return (
    <AlertContext.Provider value={{ message, visible, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
};
