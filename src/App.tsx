import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RecoilProvider from './recoil/store';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { useSSE } from './hooks/useSSE';

const queryClient = new QueryClient();

function App() {
  // useSSE();

  return (
    <RecoilProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilProvider>
  );
}

export default App;
