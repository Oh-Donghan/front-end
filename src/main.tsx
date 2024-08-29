import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, customTheme } from './config/ChakraProvider';
import './index.css';
import { worker } from './mocks/browser';
import RecoilProvider from './recoil/store';

if (import.meta.env.MODE === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilProvider>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </RecoilProvider>,
);
