import React, { createContext, useState, useContext } from 'react';
import type { Application } from '../types/types';
import { loadFromStorage } from '../storage/storage.service';

interface ApplicationState {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  selectedApplication: Application | null;
  setSelectedApplication: React.Dispatch<React.SetStateAction<Application | null>>;
  deleteIndex: number | null;
  setDeleteIndex: React.Dispatch<React.SetStateAction<number | null>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApplicationContext = createContext<ApplicationState | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>(loadFromStorage("applications") || []);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const [modal, setModal] = useState<boolean>(false)

  return (
    <ApplicationContext.Provider value={{
      applications,
      setApplications,
      selectedApplication,
      setSelectedApplication,
      deleteIndex,
      setDeleteIndex,
      modal,
      setModal
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (!context) throw new Error('Must be used inside ApplicationProvider');
  return context;
};
