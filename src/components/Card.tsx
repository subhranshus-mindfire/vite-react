import React from 'react';

interface CardProps {
  id: string;
  text: string;
  icon: React.ReactNode;
  value: number;
}

const Card = ({ id, text, icon, value }: CardProps) => {
  return (
    <div id={id} className="card text-center">
      <div className="title">{text} {icon} </div>
      <div className="value">{value}</div>
    </div>
  );
};

export default Card;
