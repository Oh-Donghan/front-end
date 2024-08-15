import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import AuctionDetail from '../pages/AuctionDetail';
import AuctionMyPage from '../pages/AuctionMyPage';
import MyInfo from '../components/mypage/myInfo/MyInfo';
import PurchaseHistory from '../components/mypage/order/PurchaseHistory';
import SellHistory from '../components/mypage/order/SellHistory';
import RechargeHistory from '../components/mypage/order/RechargeHistory';

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
            path: '',
            element: <Navigate to="myinfo" replace />,
          },
          {
            path: 'myinfo',
            element: <MyInfo />,
          },
          {
            path: 'buy',
            element: <PurchaseHistory />,
          },
          {
            path: 'sell',
            element: <SellHistory />,
          },
          {
            path: 'charge',
            element: <RechargeHistory />,
          },
        ],
      },
    ],
  },
]);
