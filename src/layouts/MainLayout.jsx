import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartBar from '../components/CartBar';
import CartDrawer from '../components/CartDrawer';
import { useFadeIn } from '../hooks/useFadeIn';

export default function MainLayout() {
  // Attach fade-in observer globally for every page
  useFadeIn();

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartBar />
      <CartDrawer />
    </>
  );
}