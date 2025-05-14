
import React, { useState, useEffect } from 'react';
import { usePWAInstallPrompt } from '@/hooks/use-pwa-install';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, ArrowRightLeft, Info, Download, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Main = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { isInstallable, promptInstall } = usePWAInstallPrompt();
  
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

  const toggleGuide = () => {
    setShowGuide(!showGuide);
  };

  return <div className="calc-container pb-16">
      {/* Hero Section */}
      <div className="bg-card rounded-lg p-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-kreya-blue via-kreya-lightBlue to-kreya-blue mb-4">
          hycalculator
        </h1>
        <p className="text-center text-muted-foreground max-w-md mx-auto"></p>
      </div>

      {/* Features Section */}
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Fitur Aplikasi</h2>
      
      {/* Main content area - different layout based on screen size */}
      <div className={isLargeScreen ? "grid grid-cols-3 gap-4 mb-8" : "card-grid mb-8"}>
        {/* Calculator Card - always in first position */}
        <Card fullWidth className={isLargeScreen ? "col-span-1" : ""}>
          <CardHeader compact className="pb-2 sm:pb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-kreya-blue/10 flex items-center justify-center mb-2">
              <Calculator className="text-kreya-blue" size={20} />
            </div>
            <CardTitle size="sm">Kalkulator Multi-Mode</CardTitle>
          </CardHeader>
          <CardContent compact>
            <CardDescription>
              Satu kalkulator dengan dua mode: Dasar dan Ilmiah. Hitung dengan mudah dari operasi sederhana hingga fungsi trigonometri kompleks.
            </CardDescription>
            <Link to="/calculator">
              <Button variant="outline" className="w-full mt-3 sm:mt-4">Buka Kalkulator</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Converter Card - in second position */}
        <Card fullWidth className={isLargeScreen ? "col-span-1" : ""}>
          <CardHeader compact className="pb-2 sm:pb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-kreya-blue/10 flex items-center justify-center mb-2">
              <ArrowRightLeft className="text-kreya-blue" size={20} />
            </div>
            <CardTitle size="sm">Konverter Unit</CardTitle>
          </CardHeader>
          <CardContent compact>
            <CardDescription>
              Konversi antar satuan dengan mudah. Panjang, berat, volume, suhu, dan banyak lagi.
            </CardDescription>
            <Link to="/converter">
              <Button variant="outline" className="w-full mt-3 sm:mt-4">Buka Converter</Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Usage Guide Card - Only visible on large screens as a third card */}
        {isLargeScreen && (
          <Card fullWidth className="col-span-1">
            <CardHeader compact className="pb-2 sm:pb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-kreya-blue/10 flex items-center justify-center mb-2">
                <BookOpen className="text-kreya-blue" size={20} />
              </div>
              <CardTitle size="sm">Panduan Penggunaan</CardTitle>
            </CardHeader>
            <CardContent compact>
              {showGuide ? (
  <div className="space-y-3 animate-fade-in">
    <div className="flex gap-3 items-start">
      <div className="w-6 h-6 rounded-full bg-kreya-blue/10 flex items-center justify-center flex-shrink-0">
        <span className="font-semibold text-kreya-blue text-xs">1</span>
      </div>
      <div>
        <h3 className="font-semibold text-xs mb-1">Pilih Mode Kalkulator</h3>
        <p className="text-muted-foreground text-xs">
          Toggle antara mode Dasar dan Ilmiah.
        </p>
      </div>
    </div>
    <div className="flex gap-3 items-start">
      <div className="w-6 h-6 rounded-full bg-kreya-blue/10 flex items-center justify-center flex-shrink-0">
        <span className="font-semibold text-kreya-blue text-xs">2</span>
      </div>
      <div>
        <h3 className="font-semibold text-xs mb-1">Masukkan Angka</h3>
        <p className="text-muted-foreground text-xs">
          Ketuk tombol untuk input angka dan operasi.
        </p>
      </div>
    </div>
    <div className="flex gap-3 items-start">
      <div className="w-6 h-6 rounded-full bg-kreya-blue/10 flex items-center justify-center flex-shrink-0">
        <span className="font-semibold text-kreya-blue text-xs">3</span>
      </div>
      <div>
        <h3 className="font-semibold text-xs mb-1">Ubah Tema</h3>
        <p className="text-muted-foreground text-xs">
          Kustomisasi tampilan di menu Settings.
        </p>
      </div>
    </div>
    <div className="flex gap-3 items-start">
      <div className="w-6 h-6 rounded-full bg-kreya-blue/10 flex items-center justify-center flex-shrink-0">
        <span className="font-semibold text-kreya-blue text-xs">4</span>
      </div>
      <div>
        <h3 className="font-semibold text-xs mb-1">Simpan Hasil</h3>
        <p className="text-muted-foreground text-xs">
          Salin hasil untuk penggunaan selanjutnya.
        </p>
      </div>
    </div>
  </div>
) : (
  <CardDescription>
    Panduan penggunaan untuk membantu Anda menggunakan aplikasi dengan mudah dan efektif.
  </CardDescription>
)}
              <Button 
                variant="outline" 
                onClick={toggleGuide}
                className="w-full mt-3 sm:mt-4 text-kreya-blue font-medium text-xs"
                size="sm"
              >
                {showGuide ? "TUTUP" : "SELENGKAPNYA"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Usage Guide Section - Only visible on small screens */}
      {!isLargeScreen && (
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">Panduan Penggunaan</h2>
            <Button 
              variant="outline" 
              onClick={toggleGuide}
              className="text-kreya-blue font-medium text-sm sm:text-base"
              size="sm"
            >
              {showGuide ? "TUTUP" : "SELENGKAPNYA"}
            </Button>
          </div>
          
          {showGuide && (
  <Card className="mb-6 sm:mb-8 animate-fade-in" fullWidth>
    <CardContent compact className="pt-4 sm:pt-6">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex gap-3 sm:gap-4">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-kreya-blue/10 flex items-center justify-center flex-shrink-0">
            <span className="font-semibold text-kreya-blue text-sm sm:text-base">1</span>
          </div>
          <div>
            <h3 className="font-semibold mb-1 text-sm sm:text-base">Pilih Mode Kalkulator</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Beralih antara mode Dasar dan Ilmiah dengan tombol toggle di bagian atas kalkulator.
            </p>
          </div>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-kreya-blue/10 flex items-center justify-center flex-shrink-0">
            <span className="font-semibold text-kreya-blue text-sm sm:text-base">2</span>
          </div>
          <div>
            <h3 className="font-semibold mb-1 text-sm sm:text-base">Masukkan Angka dan Operasi</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
                        Ketuk tombol untuk memasukkan angka dan operasi yang diinginkan. Hasil akan ditampilkan secara otomatis.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 sm:gap-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-kreya-blue/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-semibold text-kreya-blue text-sm sm:text-base">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-sm sm:text-base">Simpan Hasil</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        Salin hasil atau gunakan dalam perhitungan selanjutnya dengan tombol yang tersedia.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 sm:gap-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-kreya-blue/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-semibold text-kreya-blue text-sm sm:text-base">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-sm sm:text-base">Ubah Tema</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        Kustomisasi tampilan aplikasi dengan mengubah tema melalui menu Settings.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Install App Card - Replaced Tips Penggunaan */}
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Install Aplikasi</h2>
      <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-kreya-blue/10 to-kreya-lightBlue/5" fullWidth>
        <CardHeader compact className="pb-2 sm:pb-3">
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            <Download className="text-kreya-blue" size={18} />
            <CardTitle size="sm" className="text-base sm:text-lg">Download Aplikasi</CardTitle>
          </div>
        </CardHeader>
        <CardContent compact>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            Install hycalculator di perangkat Anda untuk akses lebih cepat dan penggunaan offline. Nikmati pengalaman terbaik dengan instalasi aplikasi.
          </p>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground list-disc pl-4 sm:pl-5 mb-3 sm:mb-4">
            <li>Akses kalkulator tanpa koneksi internet</li>
            <li>Tampilan layar penuh seperti aplikasi native</li>
            <li>Performa lebih cepat dan responsif</li>
            <li>Hemat data dan waktu loading</li>
          </ul>
          <div className="text-center">
            {isInstallable && (
              <Button
                variant="default"
                className="bg-kreya-blue hover:bg-kreya-darkBlue text-sm sm:text-base"
                onClick={promptInstall}
                size="sm"
              >
                <Download size={16} className="mr-1" />
                Install Aplikasi
              </Button>
            )}
            {!isInstallable && (
              <Button
                variant="default"
                className="bg-gray-300 text-gray-500 cursor-not-allowed text-sm sm:text-base"
                disabled
                size="sm"
              >
                <Download size={16} className="mr-1" />
                Install Aplikasi
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default Main;
