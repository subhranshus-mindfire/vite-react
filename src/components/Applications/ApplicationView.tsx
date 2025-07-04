import React from 'react';
import Applications from './Applications';

const ApplicationsView: React.FC = () => {
  return (
    <div className="text-[24px] w-full font-[poppins] mt-3 pt-2">
      <h2 className="text-center mb-2 text-3xl font-bold"><u>Job Applications</u></h2>
      <Applications />
    </div>
  );
};

export default ApplicationsView;
