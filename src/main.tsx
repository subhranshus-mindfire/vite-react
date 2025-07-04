import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ApplicationProvider } from './context/AppContext.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApplicationProvider>
      <App />
    </ApplicationProvider>
  </React.StrictMode>
);
