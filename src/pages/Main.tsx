
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, ArrowRightLeft, Info, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Main = () => {
  const [showGuide, setShowGuide] = useState(false);

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
      <h2 className="text-2xl font-bold mb-4">Fitur Aplikasi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-full bg-kreya-blue/10 flex items-center justify-center mb-2">
              <Calculator className="text-kreya-blue" />
            </div>
            <CardTitle>Kalkulator Multi-Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Satu kalkulator dengan dua mode: Dasar dan Ilmiah. Hitung dengan mudah dari operasi sederhana hingga fungsi trigonometri kompleks.
            </CardDescription>
            <Link to="/calculator">
              <Button variant="outline" className="w-full mt-4">Buka Kalkulator</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-full bg-kreya-blue/10 flex items-center justify-center mb-2">
              <ArrowRightLeft className="text-kreya-blue" />
            </div>
            <CardTitle>Konverter Unit</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Konversi antar satuan dengan mudah. Panjang, berat, volume, suhu, dan banyak lagi.
            </CardDescription>
            <Link to="/converter">
              <Button variant="outline" className="w-full mt-4">Buka Converter</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Usage Guide Section - Now hidden by default */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Panduan Penggunaan</h2>
          <Button 
            variant="outline" 
            onClick={toggleGuide}
            className="text-kreya-blue font-medium"
          >
            {showGuide ? "TUTUP" : "SELENGKAPNYA"}
          </Button>
        </div>
        
        {showGuide && (
          <Card className="mb-8 animate-fade-in">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-kreya-blue/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold text-kreya-blue">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Pilih Mode Kalkulator</h3>
                    <p className="text-muted-foreground text-sm">
                      Beralih antara mode Dasar dan Ilmiah dengan tombol toggle di bagian atas kalkulator.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-kreya-blue/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold text-kreya-blue">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Masukkan Angka dan Operasi</h3>
                    <p className="text-muted-foreground text-sm">
                      Ketuk tombol untuk memasukkan angka dan operasi yang diinginkan. Hasil akan ditampilkan secara otomatis.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-kreya-blue/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold text-kreya-blue">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Simpan Hasil</h3>
                    <p className="text-muted-foreground text-sm">
                      Salin hasil atau gunakan dalam perhitungan selanjutnya dengan tombol yang tersedia.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-kreya-blue/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold text-kreya-blue">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Ubah Tema</h3>
                    <p className="text-muted-foreground text-sm">
                      Kustomisasi tampilan aplikasi dengan mengubah tema melalui menu Settings.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Install App Card - Replaced Tips Penggunaan */}
      <h2 className="text-2xl font-bold mb-4">Install Aplikasi</h2>
      <Card className="mb-8 bg-gradient-to-r from-kreya-blue/10 to-kreya-lightBlue/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-2">
            <Download className="text-kreya-blue" />
            <CardTitle className="text-lg">Download Aplikasi</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Install hycalculator di perangkat Anda untuk akses lebih cepat dan penggunaan offline. Nikmati pengalaman terbaik dengan instalasi aplikasi.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-4">
            <li>Akses kalkulator tanpa koneksi internet</li>
            <li>Tampilan layar penuh seperti aplikasi native</li>
            <li>Performa lebih cepat dan responsif</li>
            <li>Hemat data dan waktu loading</li>
          </ul>
          <div className="text-center">
            <Button variant="default" id="install-button" className="bg-kreya-blue hover:bg-kreya-darkBlue">
              <Download size={18} />
              Install Aplikasi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default Main;
