import React, { useEffect, useState } from 'react';
import ApplicationCards from './ApplicationCards';

const Applications: React.FC = () => {
  const [viewType, setViewType] = useState<'row' | 'card'>('card');

  useEffect(() => {
    const storedView = localStorage.getItem('viewType');
    if (storedView === 'row' || storedView === 'card') {
      setViewType(storedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('viewType', viewType);
  }, [viewType]);

  return (
    <ul id="applicationTable" className="grid">
      <ApplicationCards />
    </ul>

  );
};

export default Applications;
