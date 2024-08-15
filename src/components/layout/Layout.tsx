import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';

export default function Layout() {
  const location = useLocation();

  // mypage 경로에 있을 때 Footer를 제외
  const hideFooter =
    location.pathname === '/mypage/myinfo' ||
    location.pathname === '/mypage/buy' ||
    location.pathname === '/mypage/sell' ||
    location.pathname === '/mypage/charge';

  return (
    <>
      <Nav />
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  );
}
