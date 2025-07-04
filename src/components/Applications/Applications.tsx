import React, { useEffect, useState } from 'react';
import ApplicationCards from './ApplicationCards';
import { useApplicationContext } from '../../context/AppContext';

const Applications: React.FC = () => {
  const [viewType, setViewType] = useState<'row' | 'card'>('card');
  const { applications } = useApplicationContext()

  useEffect(() => {
    const storedView = localStorage.getItem('viewType');
    if (storedView === 'row' || storedView === 'card') {
      setViewType(storedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('viewType', viewType);
  }, [viewType]);

  if (applications.length == 0) {
    return (
      <h1 className='text-center mt-6'>No Data to Show</h1>
    )
  }

  return (
    <ul
      id="applicationTable"
      className="grid gap-2 grid-cols-2 max-[1000px]:grid-cols-1"
    >
      <ApplicationCards />
    </ul>
  );
};

export default Applications;
