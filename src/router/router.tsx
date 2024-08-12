import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import AuctionDetail from '../pages/AuctionDetail';
import AuctionMyPage from '../pages/AuctionMyPage';
import MyInfo from '../components/mypage/myInfo/MyInfo';

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
        path: '/mypage',
        element: <AuctionMyPage />,
        children: [
          {
            path: '/mypage/myinfo',
            element: <MyInfo />,
          },
        ],
      },
    ],
  },
]);
