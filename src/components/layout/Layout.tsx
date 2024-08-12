import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';

export default function Layout() {
  const location = useLocation();

  // mypage 경로에 있을 때 Footer를 제외
  const hideFooter = location.pathname === '/mypage';

  return (
    <>
      <Nav />
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  );
}
