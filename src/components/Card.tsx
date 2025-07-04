import React from 'react';

interface CardProps {
  id: string;
  text: string;
  icon: React.ReactNode;
  value: number;
}

const Card = ({ id, text, icon, value }: CardProps) => {
  return (
    <div
      id={id}
      className="text-center w-[250px] h-32 bg-white rounded-[15px] p-5 flex flex-col justify-between text-[30px] shadow-md hover:scale-[1.05] transition ease-in duration-200"
    >
      <div className="flex items-center justify-center gap-2">{text} {icon}</div>
      <div>{value}</div>
    </div>
  );
};

export default Card;
