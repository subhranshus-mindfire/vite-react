import React from 'react';
import { useApplicationContext } from '../context/AppContext';
import type { Application } from '../types/types';
import { saveToStorage } from '../storage/storage.service';
import { useAlert } from '../context/AlertContext';


const Modal: React.FC = () => {
  const { modal, setModal, deleteIndex, applications, setApplications } = useApplicationContext()
  const { showAlert } = useAlert()

  function deleteApplication(index: number | null, applications: Application[]) {
    if (index == null)
      return
    applications.splice(index, 1)
    setApplications([...applications])
    showAlert("Application Deleted")
    saveToStorage("applications", [...applications])
    setModal(false)
  }

  if (!modal) return null;

  return (
    <div id="customModal" className="custom-modal">
      <div className="modal-content">
        <p id="modal-message">Do You Want to Delete it ?</p>
        <div className="modal-actions">
          <button id="modal-confirm" onClick={() => deleteApplication(deleteIndex, applications)}>Yes</button>
          <button id="modal-cancel" onClick={() => setModal(false)}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
