import React from 'react';
import Applications from './Applications';

const ApplicationsView: React.FC = () => {
  return (
    <div className="right">
      <h2 className="text-center right-heading">Job Applications</h2>
      <Applications />
    </div>
  );
};

export default ApplicationsView;
