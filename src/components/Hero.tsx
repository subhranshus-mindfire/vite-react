import React from 'react';
import Form from './Form';
import ApplicationsView from './Applications/ApplicationView';

const Hero: React.FC = () => {
  return (
    <div className="grid halfs gap-2">
      <Form />
      <ApplicationsView />
    </div>
  );
};

export default Hero;
