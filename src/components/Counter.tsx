import React, { useEffect, useState } from 'react';
import { useApplicationContext } from '../context/AppContext';
import Card from './Card';
import type { ApplicationState } from '../types/types';
import type { Application } from '../types/types';

const Counters: React.FC = () => {
  const { applications }: ApplicationState = useApplicationContext();
  const [statusCounts, setStatusCounts] = useState({
    total: 0,
    hired: 0,
    applied: 0,
    interviewing: 0,
    rejected: 0,
  });

  useEffect(() => {
    const countByStatus = (status: string) =>
      applications.filter((app: Application) => app.jobStatus === status).length;

    setStatusCounts({
      total: applications.length,
      hired: countByStatus('hired'),
      applied: countByStatus('applied'),
      interviewing: countByStatus('interviewing'),
      rejected: countByStatus('rejected'),
    });
  }, [applications]);

  const cards = [
    {
      id: 'totalApplications',
      text: 'Applications',
      icon: <i className="fa-solid fa-envelope"></i>,
      value: statusCounts.total,
    },
    {
      id: 'hiredCount',
      text: 'Hired',
      icon: <i className="fa-solid fa-circle-check" style={{ color: '#37ff00' }}></i>,
      value: statusCounts.hired,
    },
    {
      id: 'appliedCount',
      text: 'Applied',
      icon: <i className="fa-solid fa-arrow-right-to-bracket"></i>,
      value: statusCounts.applied,
    },
    {
      id: 'interviewingCount',
      text: 'Interviewing',
      icon: <i className="fa-solid fa-chalkboard-user"></i>,
      value: statusCounts.interviewing,
    },
    {
      id: 'rejectedCount',
      text: 'Rejected',
      icon: <i className="fa-solid fa-circle-xmark" style={{ color: '#ff0000' }}></i>,
      value: statusCounts.rejected,
    },
  ];

  return (
    <div className="flex flex-wrap gap-5 justify-evenly mb-6">
      {cards.map(card => (
        <Card
          key={card.id}
          id={card.id}
          text={card.text}
          icon={card.icon}
          value={card.value}
        />
      ))}
    </div>
  );
};

export default Counters;
