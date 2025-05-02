
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [hasCheckedForUpdates, setHasCheckedForUpdates] = useState(false);

  const handleCheckForUpdates = () => {
    // This would normally check for service worker updates
    setHasCheckedForUpdates(true);
    toast({
      title: "Updates",
      description: "Your app is up to date!",
    });
  };

  return (
    <div className="calc-container">
      <div className="bg-card rounded-lg p-6 space-y-8">
        <h2 className="text-2xl font-bold text-left">Settings</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Theme</h3>
              <p className="text-sm text-muted-foreground">
                Switch between dark and light mode
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Light</span>
              <Switch 
                checked={theme === "dark"} 
                onCheckedChange={toggleTheme}
                aria-label="Toggle theme"
              />
              <span className="text-sm">Dark</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Updates</h3>
              <p className="text-sm text-muted-foreground">
                Check for app updates
              </p>
            </div>
            <Button 
              variant={hasCheckedForUpdates ? "outline" : "default"}
              onClick={handleCheckForUpdates}
            >
              {hasCheckedForUpdates ? "Up to date" : "Check for updates"}
            </Button>
          </div>
          
          <div id="install-section" className="hidden">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Install App</h3>
                <p className="text-sm text-muted-foreground">
                  Add to home screen
                </p>
              </div>
              <Button 
                id="install-button-settings" 
                variant="default"
              >
                Install
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4 mt-8">
          <p className="text-sm text-muted-foreground text-center">
            hycalculator v1.0.0
          </p>
          <p className="text-xs text-muted-foreground text-center mt-1">
            © KREYA
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
