import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';

export default function Layout() {
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  return (
    <>
      {!isChatPage && <Nav />}
      <Outlet />
      {!isChatPage && <Footer />}
    </>
  );
}
