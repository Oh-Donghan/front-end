import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RecoilProvider from './recoil/store';
import { useRecoilState } from 'recoil';
import { authState } from './recoil/atom/authAtom';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(authState);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <RecoilProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RecoilProvider>
  );
}

export default App;
