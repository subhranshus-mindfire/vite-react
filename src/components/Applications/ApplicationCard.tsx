import React from 'react';
import type { Application } from '../../types/types';

interface Props {
  application: Application;
  index: number;
  onEdit: (index: number, application: Application) => void;
  onDelete: (index: number) => void;
}

const ApplicationCard: React.FC<Props> = ({ application, index, onEdit, onDelete }) => {
  const statusClass =
    application.jobStatus === 'hired'
      ? 'text-green-600'
      : application.jobStatus === 'rejected'
        ? 'text-red-600'
        : '';

  return (
    <li
      className="bg-white shadow-xl rounded-[15px] p-2 px-4 mb-3"
      id={`app-${index}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="mb-1">
            <span
              className={`inline-block text-sm md:text-base font-bold capitalize rounded px-2 py-1 bg-gray-300 ${statusClass} `}
            >
              {application.jobStatus}
            </span>
          </div>

        </div>

        <div className="flex gap-2 whitespace-nowrap text-sm md:text-base m-2">
          <a
            className="text-black font-bold bg-gray-300 px-3 py-1 rounded hover:scale-105 transition-transform"
            href="#form-heading"
            onClick={e => {
              e.preventDefault();
              onEdit(index, application);
            }}
          >
            <i className="fa-solid fa-pen mr-1" /> Edit
          </a>
          <button
            className="text-red-600 bg-red-100 font-bold px-3 py-1 rounded hover:scale-105 transition-transform"
            onClick={() => onDelete(index)}
          >
            <i className="fa-solid fa-trash mr-1" /> Delete
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-0.5'>
        <div className="text-xl md:text-2xl font-semibold">{application.applicantName}</div>
        <div className="text-lg md:text-xl" >{application.jobRole}</div>

        <div>
          <div className="text-base md:text-lg">
            <i className="fa-solid fa-building mr-1" />
            {application.companyName}
          </div>
          <div className="flex justify-between items-center text-base md:text-lg mb-2">
            <div title="Job Location">
              <i className="fa-solid fa-location-dot mr-1" />
              {application.jobType === 'remote' ? 'Remote' : application.location}
            </div>
            <div className='italic text-gray-700 text-sm'>Applied On {application.applicationDate}</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ApplicationCard;
