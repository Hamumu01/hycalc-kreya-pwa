
import { Link, useLocation } from "react-router-dom";
import { 
  Calculator, 
  ArrowRightLeft, 
  Settings as SettingsIcon,
  Home,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";

interface NavigationProps {
  position?: "top" | "bottom";
}

const Navigation: React.FC<NavigationProps> = ({ position = "bottom" }) => {
  const location = useLocation();
  const path = location.pathname;
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Function to check screen size (11 inches is approximately 1100px)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1100);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const getActiveClass = (route: string) => {
    if (route === '/' && path === '/') return 'active';
    return path.includes(route) && route !== '/' ? "active" : "";
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navLinks = [
    { to: "/", label: "Home", icon: <Home size={24} /> },
    { to: "/calculator", label: "Calculator", icon: <Calculator size={24} /> },
    { to: "/converter", label: "Converter", icon: <ArrowRightLeft size={24} /> },
    { to: "/settings", label: "Settings", icon: <SettingsIcon size={24} /> }
  ];
  
  // Large screen dropdown navigation (always at top)
  if (isLargeScreen) {
    return (
      <nav className="top-navigation bg-card rounded-lg shadow-sm relative">
        <button 
          onClick={toggleMenu}
          className="flex items-center justify-between w-full p-3 focus:outline-none"
          aria-expanded={isMenuOpen}
          aria-label="Navigation Menu"
        >
          <span className="font-medium">Menu</span>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-card rounded-lg shadow-lg mt-1 z-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-dropdown-item ${getActiveClass(link.to)}`}
                aria-label={link.label}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    );
  }
  
  // Small screen bottom navigation bar
  return (
    <nav className="bottom-navigation bg-card rounded-lg shadow-sm">
      <div className="flex items-center justify-around">
        {navLinks.map((link) => (
          <Link 
            key={link.to}
            to={link.to} 
            className={`nav-link ${getActiveClass(link.to)}`}
            aria-label={link.label}
          >
            {link.icon}
            <span className="text-xs mt-1">{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
