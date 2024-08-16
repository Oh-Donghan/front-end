import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, customTheme } from './config/ChakraProvider';
import './index.css';
import { worker } from './mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
