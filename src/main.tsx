import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ApplicationProvider } from './context/AppContext.tsx';
import { AlertProvider } from './context/AlertContext.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AlertProvider>
      <ApplicationProvider>
        <App />
      </ApplicationProvider>
    </AlertProvider>
  </React.StrictMode>
);
