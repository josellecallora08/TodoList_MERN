import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {TaskContextProvider} from './context/TaskContext'
import { UserContextProvider } from './context/UserContext';
import { LoadingProvider } from './context/LoadingContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <LoadingProvider>
      <UserContextProvider>
        <TaskContextProvider>
          <App />
        </TaskContextProvider>
      </UserContextProvider>
    </LoadingProvider>
  </React.StrictMode>
);
