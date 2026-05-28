// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// We don't need to import Firebase specific initialization here anymore.
// Our `src/firebase.ts` file handles that.

// Now you can render your React app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
