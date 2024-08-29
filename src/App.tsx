import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RecoilProvider from './recoil/store';
import { useRecoilState } from 'recoil';
import { authState } from './recoil/atom/authAtom';
import { useEffect } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(authState);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, [isLoggedIn]);

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
