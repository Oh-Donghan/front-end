import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RecoilProvider from './recoil/store';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
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
