
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Loading from "./components/Loading";
import Layout from "./components/Layout";
import BasicCalculator from "./pages/BasicCalculator";
import ScientificCalculator from "./pages/ScientificCalculator";
import Converter from "./pages/Converter";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { register } from "./serviceWorkerRegistration";
import { showInstallPrompt } from "./serviceWorkerUtils";

const queryClient = new QueryClient();

// Register the service worker
register({
  onSuccess: () => {
    console.log("Service Worker registered successfully!");
  },
  onUpdate: (registration) => {
    console.log("New content is available; please refresh.");
    // You could show a refresh notification to the user here
  },
});

const App = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Show PWA install prompt when ready
    showInstallPrompt();
    
    // Simulate loading for demonstration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/calculator" replace />} />
              <Route path="calculator" element={<BasicCalculator />} />
              <Route path="scientific" element={<ScientificCalculator />} />
              <Route path="converter" element={<Converter />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
