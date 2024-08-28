import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import AuctionDetail from '../pages/AuctionDetail';
import Chat from '../pages/Chat';
import AuctionMyPage from '../pages/AuctionMyPage';
import AuctionList from '../pages/AuctionList';
import MyInfo from '../components/mypage/myInfo/MyInfo';
import PurchaseHistory from '../components/mypage/order/PurchaseHistory';
import SellHistory from '../components/mypage/order/SellHistory';
import RechargeHistory from '../components/mypage/order/RechargeHistory';
import Payment from '../pages/Payment';

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
        path: '/detail/:id',
        element: <AuctionDetail />,
      },
      {
        path: '/auctions',
        element: <AuctionList />,
      },
      { path: '/chat', element: <Chat /> },
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
      {
        path: '/members',
        children: [
          {
            path: 'payment/approve',
            element: <Payment />,
          },
          {
            path: 'payment/cancle',
            element: <Payment />,
          },
        ],
      },
    ],
  },
]);
