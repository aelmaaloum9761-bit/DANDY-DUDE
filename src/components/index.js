import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import your main application component
import './styles/globals.css'; // Import your global styles

console.log('components/index.js: running — attempting to mount App');

// Find the root element in your HTML file.
const container = document.getElementById('root');
if (!container) {
  console.error('Root container not found: document.getElementById("root") returned', container);
} else {
  // Create a React root and render the App component inside it.
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React root created and App rendered');
}