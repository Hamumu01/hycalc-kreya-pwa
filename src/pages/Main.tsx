import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, AtomIcon, ArrowRightLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
const Main = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-full bg-kreya-blue/10 flex items-center justify-center mb-2">
              <Calculator className="text-kreya-blue" />
            </div>
            <CardTitle>Kalkulator Dasar</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Lakukan perhitungan dasar dengan mudah. Tambah, kurang, kali, dan bagi dengan antarmuka yang intuitif.
            </CardDescription>
            <Link to="/calculator">
              <Button variant="outline" className="w-full mt-4">Buka Kalkulator</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="w-12 h-12 rounded-full bg-kreya-blue/10 flex items-center justify-center mb-2">
              <AtomIcon className="text-kreya-blue" />
            </div>
            <CardTitle>Kalkulator Ilmiah</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Fungsi lanjutan untuk perhitungan kompleks. Sin, cos, tan, logaritma, dan masih banyak lagi.
            </CardDescription>
            <Link to="/scientific">
              <Button variant="outline" className="w-full mt-4">Buka Scientific</Button>
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

      {/* Usage Guide Section */}
      <h2 className="text-2xl font-bold mb-4">Panduan Penggunaan</h2>
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-kreya-blue/10 flex items-center justify-center flex-shrink-0">
                <span className="font-semibold text-kreya-blue">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Pilih Mode Kalkulator</h3>
                <p className="text-muted-foreground text-sm">
                  Pilih mode kalkulator yang sesuai dengan kebutuhan Anda: Dasar, Ilmiah, atau Konverter.
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

      {/* Additional Tips */}
      <h2 className="text-2xl font-bold mb-4">Tips Penggunaan</h2>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-2">
            <Info className="text-kreya-blue" />
            <CardTitle className="text-lg">Tips dan Trik</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
            <li>Ketuk ganda tombol AC untuk mereset semua riwayat perhitungan.</li>
            <li>Gunakan tombol switch untuk beralih antar mode tampilan pada kalkulator ilmiah.</li>
            <li>Untuk hasil yang lebih akurat pada konversi, gunakan format angka yang sesuai.</li>
            <li>Instalasi aplikasi di perangkat Anda untuk akses offline.</li>
          </ul>
          <div className="mt-6 text-center">
            <Link to="/settings">
              <Button variant="outline">Pengaturan Lanjutan</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Copyright */}
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
    </div>;
};
export default Main;