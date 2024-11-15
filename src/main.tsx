import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, customTheme } from './config/ChakraProvider';
import './index.css';
import RecoilProvider from './recoil/store';

if (import.meta.env.MODE === 'development') {
  import('./mocks/browser').then(({ worker }) => {
    worker.start({
      onUnhandledRequest: 'bypass', // 처리되지 않은 요청을 네트워크로 전달
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilProvider>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </RecoilProvider>,
);
