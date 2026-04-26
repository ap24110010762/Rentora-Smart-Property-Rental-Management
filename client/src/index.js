import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // 👈 THIS LINE IS THE MOST IMPORTANT (It loads your new styles)

// 1. We find the 'root' div in your public/index.html file
const rootElement = document.getElementById('root');

// 2. We create the React root
const root = ReactDOM.createRoot(rootElement);

// 3. We render your main App (which contains the Login/Register/Dashboard)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);