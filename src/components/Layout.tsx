import { Outlet, useLocation } from "react-router-dom";
import NavigationSidebar from './NavigationSidebar';
import FixedSidebar from './Sidebar';
import { useCMS } from '../hooks/useCMS';
import { useUI } from '../context/UIContext';

const Layout = () => {
  const location = useLocation();
  const { isMenuOpen, openMenu, closeMenu } = useUI();
  
  // Map current path to pageId for SEO
  const pageIdMap: Record<string, string> = {
    '/': 'home',
    '/about': 'about',
    '/services': 'services',
    '/projects': 'projects',
    '/contact': 'contact',
    '/blog': 'blog',
    '/projects/treasure': 'projects'
  };

  const pageId = pageIdMap[location.pathname] || 'home';
  useCMS(pageId);

  return (
    <>
      <FixedSidebar onOpenMenu={openMenu} />
      <NavigationSidebar isOpen={isMenuOpen} onClose={closeMenu} />

      {/* This is where the page content loads */}
      <Outlet />
    </>
  );
};

export default Layout;
