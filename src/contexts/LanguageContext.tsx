
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Translation {
  key: string;
  category: string;
  defaultText: string;
  translations: { [languageCode: string]: string };
}

interface LanguageContextType {
  currentLanguage: string;
  availableLanguages: { code: string; name: string }[];
  translations: Translation[];
  setCurrentLanguage: (language: string) => void;
  addLanguage: (code: string, name: string) => void;
  updateTranslation: (key: string, languageCode: string, text: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const defaultTranslations: Translation[] = [
  // Navigation
  { key: 'nav.dashboard', category: 'Navigation', defaultText: 'Dashboard', translations: {} },
  { key: 'nav.crm', category: 'Navigation', defaultText: 'CRM Core Module', translations: {} },
  { key: 'nav.subscription', category: 'Navigation', defaultText: 'Subscription Management', translations: {} },
  { key: 'nav.booking', category: 'Navigation', defaultText: 'Booking Management', translations: {} },
  { key: 'nav.tasks', category: 'Navigation', defaultText: 'Task Management', translations: {} },
  { key: 'nav.projects', category: 'Navigation', defaultText: 'Project Management', translations: {} },
  { key: 'nav.newsletters', category: 'Navigation', defaultText: 'Newsletters', translations: {} },
  { key: 'nav.support', category: 'Navigation', defaultText: 'Support System', translations: {} },
  { key: 'nav.settings', category: 'Navigation', defaultText: 'Settings', translations: {} },
  
  // Buttons
  { key: 'button.save', category: 'Buttons', defaultText: 'Save', translations: {} },
  { key: 'button.cancel', category: 'Buttons', defaultText: 'Cancel', translations: {} },
  { key: 'button.edit', category: 'Buttons', defaultText: 'Edit', translations: {} },
  { key: 'button.delete', category: 'Buttons', defaultText: 'Delete', translations: {} },
  { key: 'button.add', category: 'Buttons', defaultText: 'Add', translations: {} },
  
  // General
  { key: 'general.loading', category: 'General', defaultText: 'Loading...', translations: {} },
  { key: 'general.search', category: 'General', defaultText: 'Search', translations: {} },
  { key: 'general.language', category: 'General', defaultText: 'Language', translations: {} },
  
  // Dashboard
  { key: 'dashboard.title', category: 'Dashboard', defaultText: 'Dashboard', translations: {} },
  { key: 'dashboard.welcome', category: 'Dashboard', defaultText: 'Welcome to your modular CRM system', translations: {} },
  { key: 'dashboard.totalCustomers', category: 'Dashboard', defaultText: 'Total Customers', translations: {} },
  { key: 'dashboard.activeSubscriptions', category: 'Dashboard', defaultText: 'Active Subscriptions', translations: {} },
  { key: 'dashboard.bookingsThisMonth', category: 'Dashboard', defaultText: 'Bookings This Month', translations: {} },
  { key: 'dashboard.openTasks', category: 'Dashboard', defaultText: 'Open Tasks', translations: {} },
  
  // Settings
  { key: 'settings.moduleSettings', category: 'Settings', defaultText: 'Module Settings', translations: {} },
  { key: 'settings.languageSettings', category: 'Settings', defaultText: 'Language Settings', translations: {} },
  { key: 'settings.enableDisable', category: 'Settings', defaultText: 'Enable or disable modules according to your needs', translations: {} },
];

const getBrowserLanguage = (): string => {
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'en' ? 'en' : browserLang;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [availableLanguages, setAvailableLanguages] = useState([
    { code: 'en', name: 'English' }
  ]);
  const [translations, setTranslations] = useState<Translation[]>(defaultTranslations);

  useEffect(() => {
    // Load saved data from localStorage
    const savedLanguage = localStorage.getItem('currentLanguage');
    const savedLanguages = localStorage.getItem('availableLanguages');
    const savedTranslations = localStorage.getItem('translations');

    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    } else {
      const browserLang = getBrowserLanguage();
      setCurrentLanguage(browserLang);
    }

    if (savedLanguages) {
      setAvailableLanguages(JSON.parse(savedLanguages));
    }

    if (savedTranslations) {
      setTranslations(JSON.parse(savedTranslations));
    }
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('currentLanguage', currentLanguage);
    localStorage.setItem('availableLanguages', JSON.stringify(availableLanguages));
    localStorage.setItem('translations', JSON.stringify(translations));
  }, [currentLanguage, availableLanguages, translations]);

  const addLanguage = (code: string, name: string) => {
    if (!availableLanguages.find(lang => lang.code === code)) {
      setAvailableLanguages(prev => [...prev, { code, name }]);
    }
  };

  const updateTranslation = (key: string, languageCode: string, text: string) => {
    setTranslations(prev => prev.map(translation => 
      translation.key === key 
        ? { 
            ...translation, 
            translations: { 
              ...translation.translations, 
              [languageCode]: text 
            } 
          }
        : translation
    ));
  };

  const t = (key: string): string => {
    const translation = translations.find(t => t.key === key);
    if (!translation) return key;
    
    return translation.translations[currentLanguage] || translation.defaultText;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      availableLanguages,
      translations,
      setCurrentLanguage,
      addLanguage,
      updateTranslation,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
