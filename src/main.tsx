import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, customTheme } from './config/ChakraProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
