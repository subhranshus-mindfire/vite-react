import React from 'react';
import Form from './Form';
import ApplicationsView from './Applications/ApplicationView';

const Hero: React.FC = () => {
  return (
    <div className="xl:grid xl:grid-cols-[35%_65%] block gap-5 px-2 md:px-6 md:mx-2">
      <Form />
      <ApplicationsView />
    </div>
  );
};

export default Hero;
