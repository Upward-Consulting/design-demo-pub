import { useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import Home from './pages/Home';
import Products from './pages/Products';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Fabrication from './pages/Fabrication';
import References from './pages/References';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function Layout() {
  const { pathname } = useLocation();

  // A new page starts at the top. Filter changes on the same page do not scroll.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="fabrication" element={<Fabrication />} />
        <Route path="references" element={<References />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
