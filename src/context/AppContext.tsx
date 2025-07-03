import React, { createContext, useState } from 'react';
import type { Application } from '../types/types';

interface ApplicationState {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
}

export const ApplicationContext = createContext<ApplicationState | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>([]);

  return (
    <ApplicationContext.Provider value={{ applications, setApplications }}>
      {children}
    </ApplicationContext.Provider>
  );
};

