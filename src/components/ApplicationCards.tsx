import React from 'react';
import { useApplicationContext } from '../context/AppContext';
import ApplicationCard from './ApplicationCard';
import type { Application } from '../types/types';

const ApplicationCards: React.FC = () => {
  const { applications } = useApplicationContext();
  return (
    applications.map((app: Application, index: number) => (
      <ApplicationCard
        key={app.id}
        application={app}
        index={index}
      />
    ))
  );
};

export default ApplicationCards;
