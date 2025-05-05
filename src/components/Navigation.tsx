
import { Link, useLocation } from "react-router-dom";
import { 
  Calculator, 
  AtomIcon, 
  ArrowRightLeft, 
  Settings as SettingsIcon,
  Home
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const getActiveClass = (route: string) => {
    if (route === '/' && path === '/') return 'active';
    return path.includes(route) && route !== '/' ? "active" : "";
  };
  
  return (
    <nav className="mt-4 bg-card rounded-lg shadow-sm">
      <div className="flex items-center justify-around">
        <Link 
          to="/" 
          className={`nav-link ${getActiveClass("/")}`}
          aria-label="Home"
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/calculator" 
          className={`nav-link ${getActiveClass("calculator")}`}
          aria-label="Basic Calculator"
        >
          <Calculator size={24} />
          <span className="text-xs mt-1">Calculator</span>
        </Link>
        
        <Link 
          to="/scientific" 
          className={`nav-link ${getActiveClass("scientific")}`}
          aria-label="Scientific Calculator"
        >
          <AtomIcon size={24} />
          <span className="text-xs mt-1">Scientific</span>
        </Link>
        
        <Link 
          to="/converter" 
          className={`nav-link ${getActiveClass("converter")}`}
          aria-label="Unit Converter"
        >
          <ArrowRightLeft size={24} />
          <span className="text-xs mt-1">Converter</span>
        </Link>
        
        <Link 
          to="/settings" 
          className={`nav-link ${getActiveClass("settings")}`}
          aria-label="Settings"
        >
          <SettingsIcon size={24} />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
