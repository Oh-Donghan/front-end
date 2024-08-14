import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import AuctionDetail from '../pages/AuctionDetail';
import Chat from '../pages/Chat';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/detail',
        element: <AuctionDetail />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
    ],
  },
]);
