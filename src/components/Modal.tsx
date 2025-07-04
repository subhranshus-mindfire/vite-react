import React from 'react';
import { useApplicationContext } from '../context/AppContext';
import type { Application } from '../types/types';
import { saveToStorage } from '../storage/storage.service';
import { useAlert } from '../context/AlertContext';

const Modal: React.FC = () => {
  const { modal, setModal, deleteIndex, applications, setApplications } = useApplicationContext();
  const { showAlert } = useAlert();

  function deleteApplication(index: number | null, applications: Application[]) {
    if (index == null) return;
    applications.splice(index, 1);
    setApplications([...applications]);
    showAlert("Application Deleted");
    saveToStorage("applications", [...applications]);
    setModal(false);
  }

  if (!modal) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#0009] flex items-center justify-center z-10 text-[30px]">
      <div className="bg-white px-10 py-6 rounded-[16px] min-w-[300px] text-center">
        <p className="mb-6">Do You Want to Delete it?</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => deleteApplication(deleteIndex, applications)}
            className="text-white bg-orange-600 border-2 border-orange-600 min-w-[100px] py-2 px-4 text-[20px] rounded-[10px] hover:bg-orange-700 transition"
          >
            Yes
          </button>
          <button
            onClick={() => setModal(false)}
            className="border-2 border-gray-300 min-w-[100px] py-2 px-4 text-[20px] rounded-[10px] hover:bg-gray-200 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
