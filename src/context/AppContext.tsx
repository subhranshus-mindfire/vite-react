import React, { createContext, useContext, useState } from 'react';
import type { Application } from '../types/types';

interface ApplicationState {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
}

const ApplicationContext = createContext<ApplicationState | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>([]);

  return (
    <ApplicationContext.Provider value={{ applications, setApplications }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = (): ApplicationState => {
  const context = useContext(ApplicationContext);
  if (!context) throw new Error("useApplicationContext must be used within an ApplicationProvider");
  return context;
};
