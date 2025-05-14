export type Language = 'en' | 'id';

export interface Translation {
  // Common
  settings: string;
  language: string;
  theme: string;
  light: string;
  dark: string;
  system: string;
  
  // Calculator
  basicCalculator: string;
  scientificCalculator: string;
  clear: string;
  delete: string;
  fraction: string;
  
  // Settings
  selectLanguage: string;
  english: string;
  indonesian: string;
  appearance: string;
  chooseTheme: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    // Common
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    
    // Calculator
    basicCalculator: 'Basic Calculator',
    scientificCalculator: 'Scientific Calculator',
    clear: 'Clear',
    delete: 'Delete',
    fraction: 'Fraction',
    
    // Settings
    selectLanguage: 'Select Language',
    english: 'English',
    indonesian: 'Indonesian',
    appearance: 'Appearance',
    chooseTheme: 'Choose theme'
  },
  id: {
    // Common
    settings: 'Pengaturan',
    language: 'Bahasa',
    theme: 'Tema',
    light: 'Terang',
    dark: 'Gelap',
    system: 'Sistem',
    
    // Calculator
    basicCalculator: 'Kalkulator Dasar',
    scientificCalculator: 'Kalkulator Ilmiah',
    clear: 'Hapus',
    delete: 'Hapus',
    fraction: 'Pecahan',
    
    // Settings
    selectLanguage: 'Pilih Bahasa',
    english: 'Bahasa Inggris',
    indonesian: 'Bahasa Indonesia',
    appearance: 'Tampilan',
    chooseTheme: 'Pilih tema'
  }
};
