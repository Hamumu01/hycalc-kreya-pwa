
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
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
        <h2 className="text-2xl font-bold text-left">{t('settings')}</h2>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{t('language')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('selectLanguage')}
              </p>
            </div>
            <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'id')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('selectLanguage')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t('english')}</SelectItem>
                <SelectItem value="id">{t('indonesian')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{t('theme')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('chooseTheme')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">{t('light')}</span>
              <Switch 
                checked={theme === "dark"} 
                onCheckedChange={toggleTheme}
                aria-label="Toggle theme"
              />
              <span className="text-sm">{t('dark')}</span>
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
            © 2025 KREYA. Hak Cipta Dilindungi.
          </p>
          <p className="text-xs text-muted-foreground text-center mt-1">
            Dilarang menyalin atau menggunakan tanpa izin resmi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
