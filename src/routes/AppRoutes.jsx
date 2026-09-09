import { Routes, Route } from 'react-router-dom';
import MainLayout   from '../layouts/MainLayout';
import Home         from '../pages/Home';
import Menu         from '../pages/Menu';
import GalleryPage  from '../pages/GalleryPage';
import About        from '../pages/About';
import Contact      from '../pages/Contact';
import AdminPanel   from '../pages/AdminPanel';
import NotFound     from '../pages/NotFound';


export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/"        element={<Home />} />
        <Route path="/menu"    element={<Menu />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about"   element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin"   element={<AdminPanel />} />
        <Route path="*"        element={<NotFound />} />
              </Route>
    </Routes>
  );
}
