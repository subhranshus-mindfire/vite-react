import React, { useState, useEffect, useRef } from 'react';
import { JOB_ROLES } from '../constants/constants';
import { useApplicationContext } from '../context/AppContext';
import { saveToStorage } from '../storage/storage.service';
import type { Application } from '../types/types';
import { useAlert } from '../context/AlertContext';

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

  const { showAlert } = useAlert();

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (selectedApplication) {
      const { id, ...rest } = selectedApplication;
      console.log(id);
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
      showAlert("Application Updated");
      saveToStorage('applications', updatedList);
      setSelectedApplication(null);
    } else {
      const newApp: Application = {
        id: Date.now().toString(),
        ...formData,
      };
      const updatedList = [...applications, newApp];
      setApplications(updatedList);
      showAlert("Application Added");
      saveToStorage('applications', updatedList);
    }

    setFormData(initialFormState);
    setErrors({});
    setSuggestions([]);
  };

  return (
    <div className="bg-white rounded-4xl p-6 font-[Poppins] text-[23px] xl:sticky top-5 self-start w-full shadow-2xl rounded-4">
      <h2 className="text-center text-3xl font-bold underline mb-4">Job Application Form</h2>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} id="applicationForm" className="w-full">
          <div className="flex flex-col mb-3">
            <label>
              Applicant Name<span className="text-red-600 text-base">*</span>
            </label>
            <input
              type="text"
              name="applicantName"
              value={formData.applicantName}
              onChange={handleChange}
              className="h-[35px] text-lg pl-2 rounded border-2 border-gray-300"
            />
            {errors.applicantName && <span className="text-red-600 text-base">{errors.applicantName}</span>}
          </div>

          <div className="flex flex-col mb-3">
            <label>
              Company Name<span className="text-red-600 text-base">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="h-[35px] text-lg pl-2 rounded border-2 border-gray-300"
            />
            {errors.companyName && <span className="text-red-600 text-base">{errors.companyName}</span>}
          </div>

          <div className="flex flex-col mb-3 relative">
            <label>
              Job Role<span className="text-red-600 text-base">*</span>
            </label>
            <input
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              autoComplete="off"
              className="h-[35px] text-lg pl-2 rounded border-2 border-gray-300"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul
                className="absolute top-full left-0 w-full bg-white border border-gray-300 max-h-[150px] overflow-y-auto z-10"
                ref={suggestionsRef}
              >
                {suggestions.map(role => (
                  <li
                    key={role}
                    onClick={() => handleSuggestionClick(role)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-base"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            )}
            {errors.jobRole && <span className="text-red-600 text-base">{errors.jobRole}</span>}
          </div>

          <div className="flex flex-col mb-3">
            <label>
              Job Type<span className="text-red-600 text-base">*</span>
            </label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="h-[35px] text-lg pl-2 rounded border-2 border-gray-300"
            >
              <option value="onsite">On-Site</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
            {errors.jobType && <span className="text-red-600 text-base">{errors.jobType}</span>}
          </div>

          {formData.jobType !== 'remote' && (
            <div className="flex flex-col mb-3">
              <label>
                Location<span className="text-red-600 text-base">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="h-[35px] text-lg pl-2 rounded border-2 border-gray-300"
              />
              {errors.location && <span className="text-red-600 text-base">{errors.location}</span>}
            </div>
          )}

          <div className="flex flex-col mb-3">
            <label>
              Application Date<span className="text-red-600 text-base">*</span>
            </label>
            <input
              type="date"
              name="applicationDate"
              value={formData.applicationDate}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className="h-[35px] text-lg pl-2 rounded border-2 border-gray-300"
            />
            {errors.applicationDate && <span className="text-red-600 text-base">{errors.applicationDate}</span>}
          </div>

          <div className="flex flex-col mb-3">
            <label>
              Application Status<span className="text-red-600 text-base">*</span>
            </label>
            <select
              name="jobStatus"
              value={formData.jobStatus}
              onChange={handleChange}
              className="h-[35px] text-lg pl-2 rounded border-2 border-gray-300"
            >
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="rejected">Rejected</option>
              <option value="hired">Hired</option>
            </select>
            {errors.jobStatus && <span className="text-red-600 text-base">{errors.jobStatus}</span>}
          </div>

          <div className="flex flex-col mb-3">
            <label>Notes</label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="h-[35px] text-lg pl-2 rounded border-2 border-gray-300"
            />
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <input
              type="submit"
              value={selectedApplication ? 'Update' : 'Submit'}
              className="bg-blue-600 hover:bg-blue-900 text-white px-5 py-2 rounded-lg text-lg cursor-pointer"
            />
            {selectedApplication && (
              <input
                type="button"
                className="bg-gray-200 border border-gray-400 px-5 py-2 rounded-lg text-lg cursor-pointer"
                onClick={() => {
                  setSelectedApplication(null);
                  setFormData(initialFormState);
                }}
                value="Cancel"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
