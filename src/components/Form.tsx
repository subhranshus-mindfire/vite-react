import React, { useState, useEffect, useRef } from 'react';
import { JOB_ROLES } from '../constants/constants';
import { useApplicationContext } from '../context/AppContext';
import { saveToStorage } from '../storage/storage.service';
import type { Application } from '../types/types';

const initialFormState: Omit<Application, 'id'> = {
  applicantName: '',
  companyName: '',
  jobRole: '',
  jobType: 'onsite',
  location: '',
  applicationDate: '',
  jobStatus: 'applied',
  notes: '',
};

const Form: React.FC = () => {
  const {
    applications,
    setApplications,
    selectedApplication,
    setSelectedApplication,
  } = useApplicationContext();

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (selectedApplication) {
      const { id, ...rest } = selectedApplication;
      console.log(id)
      setFormData(rest);
    } else {
      setFormData(initialFormState);
    }
  }, [selectedApplication]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'jobRole') {
      const filtered = value.trim()
        ? JOB_ROLES.filter(role => role.toLowerCase().includes(value.toLowerCase()))
        : [];
      setSuggestions(filtered);
      setShowSuggestions(!!filtered.length);
    }
  };

  const handleSuggestionClick = (role: string) => {
    setFormData(prev => ({ ...prev, jobRole: role }));
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.applicantName) newErrors.applicantName = 'Applicant name is required.';
    if (!formData.companyName) newErrors.companyName = 'Company name is required.';
    if (!formData.jobRole) newErrors.jobRole = 'Job role is required.';
    if (!formData.jobType) newErrors.jobType = 'Job type is required.';
    if (formData.jobType !== 'remote' && !formData.location) newErrors.location = 'Location is required.';
    if (!formData.applicationDate) newErrors.applicationDate = 'Application date is required.';
    if (!formData.jobStatus) newErrors.jobStatus = 'Job status is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (selectedApplication) {
      const updated = { ...selectedApplication, ...formData };
      const updatedList = applications.map(app =>
        app.id === selectedApplication.id ? updated : app
      );
      setApplications(updatedList);
      saveToStorage('applications', updatedList);
      setSelectedApplication(null);
    } else {
      const newApp: Application = {
        id: Date.now().toString(),
        ...formData,
      };
      const updatedList = [...applications, newApp];
      setApplications(updatedList);
      saveToStorage('applications', updatedList);
    }

    setFormData(initialFormState);
    setErrors({});
    setSuggestions([]);
  };

  return (
    <div className="form bg-light left">
      <h2 className="text-center"><u>Job Application Form</u></h2>
      <div className="flex justify-content-center">
        <form onSubmit={handleSubmit} id="applicationForm">
          <div className="input">
            <label>Applicant Name<span className="text-danger">*</span></label>
            <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} />
            {errors.applicantName && <span className="text-danger">{errors.applicantName}</span>}
          </div>

          <div className="input">
            <label>Company Name<span className="text-danger">*</span></label>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
            {errors.companyName && <span className="text-danger">{errors.companyName}</span>}
          </div>

          <div className="input">
            <label>Job Role<span className="text-danger">*</span></label>
            <input
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="autocomplete-roles" ref={suggestionsRef}>
                {suggestions.map(role => (
                  <li key={role} onClick={() => handleSuggestionClick(role)}>
                    {role}
                  </li>
                ))}
              </ul>
            )}
            {errors.jobRole && <span className="text-danger">{errors.jobRole}</span>}
          </div>

          <div className="input">
            <label>Job Type<span className="text-danger">*</span></label>
            <select name="jobType" value={formData.jobType} onChange={handleChange}>
              <option value="onsite">On-Site</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
            {errors.jobType && <span className="text-danger">{errors.jobType}</span>}
          </div>

          {formData.jobType !== 'remote' && (
            <div className="input">
              <label>Location<span className="text-danger">*</span></label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} />
              {errors.location && <span className="text-danger">{errors.location}</span>}
            </div>
          )}

          <div className="input">
            <label>Application Date<span className="text-danger">*</span></label>
            <input
              type="date"
              name="applicationDate"
              value={formData.applicationDate}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.applicationDate && <span className="text-danger">{errors.applicationDate}</span>}
          </div>

          <div className="input">
            <label>Application Status<span className="text-danger">*</span></label>
            <select name="jobStatus" value={formData.jobStatus} onChange={handleChange}>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="rejected">Rejected</option>
              <option value="hired">Hired</option>
            </select>
            {errors.jobStatus && <span className="text-danger">{errors.jobStatus}</span>}
          </div>

          <div className="input">
            <label>Notes</label>
            <input type="text" name="notes" value={formData.notes} onChange={handleChange} />
          </div>

          <div className="buttons flex justify-center">
            <input type="submit" value={selectedApplication ? 'Update' : 'Submit'} className="submit-btn" />
            {selectedApplication && (
              <input
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setSelectedApplication(null);
                  setFormData(initialFormState);
                }}
                value={"Cancel"}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
