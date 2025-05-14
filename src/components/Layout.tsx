
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { useTheme } from "@/hooks/use-theme";
import { useState, useEffect } from "react";

const Layout = () => {
  const { theme } = useTheme();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  
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
  
  return (
    <div className={`min-h-screen w-full flex flex-col px-4 py-6 ${theme}`}>
      {isLargeScreen && <Navigation />}
      
      <div className="calc-container flex-1 flex flex-col">
        <div className="flex-1 overflow-hidden flex flex-col">
          <Outlet />
        </div>
        {!isLargeScreen && <Navigation />}
      </div>
      

    </div>
  );
};

export default Layout;
