import React from 'react';
import type { Application } from '../types/types';

interface Props {
  application: Application;
  index: number;
}

const ApplicationCard: React.FC<Props> = ({ application, index }) => {
  const statusClass =
    application.jobStatus === 'hired'
      ? 'text-success'
      : application.jobStatus === 'rejected'
        ? 'text-danger'
        : '';

  return (
    <li className="application-card" id={`app-${index}`}>
      <div className="application-card-header flex">
        <div className="application-card-header-left">
          <div className="application-card-status">
            <span className={statusClass}>{application.jobStatus}</span>
          </div>
          <div className="application-card-applicantName">
            <b>{application.applicantName}</b>
          </div>
          <div className="application-card-role">{application.jobRole}</div>
        </div>
        <div className="application-card-header-right">
          <div className="actions flex nowrap">
            <a
              className="edit"
              href="#form-heading"
            >
              <i className="fa-solid fa-pen"></i> Edit
            </a>
            <a
              className="delete"

            >
              <i className="fa-solid fa-trash"></i> Delete
            </a>
          </div>
        </div>
      </div>
      <div className="application-card-body">
        <div className="application-card-name">
          <span title="Company">
            <i className="fa-solid fa-building"></i> {application.companyName}
          </span>
        </div>
        <div className="flex application-card-footer">
          <div className="application-card-location" title="Job Location">
            <span>
              <i className="fa-solid fa-location-dot"></i>{' '}
              {application.jobType === 'remote' ? 'Remote' : application.location}
            </span>
          </div>
          <div className="application-card-date">
            Applied On {application.applicationDate}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ApplicationCard;
