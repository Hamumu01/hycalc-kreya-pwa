
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { useTheme } from "@/hooks/use-theme";

const Layout = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen w-full flex flex-col px-4 py-6 ${theme}`}>
      <div className="calc-container flex-1 flex flex-col">
        <div className="flex-1 overflow-hidden flex flex-col">
          <Outlet />
        </div>
        <Navigation />
      </div>
      
      {/* Hidden install button that will be shown when install prompt is available */}
      <button 
        id="install-button" 
        className="fixed bottom-24 right-4 bg-kreya-blue text-white p-3 rounded-full shadow-lg hidden" 
        aria-label="Install App"
      >
        Install App
      </button>
    </div>
  );
};

export default Layout;
