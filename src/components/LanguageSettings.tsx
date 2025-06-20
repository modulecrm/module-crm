
import React, { useState } from 'react';
import { Plus, Search, Globe, Save, Wand2, Trash2, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// Predefined languages with their locale codes
const PREDEFINED_LANGUAGES = [
  { code: 'da', name: 'Danish' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'it', name: 'Italian' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'sv', name: 'Swedish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'fi', name: 'Finnish' },
  { code: 'pl', name: 'Polish' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'tr', name: 'Turkish' },
  { code: 'hi', name: 'Hindi' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' }
];

const LanguageSettings = () => {
  const { currentLanguage, availableLanguages, translations, addLanguage, deleteLanguage, updateTranslation, setCurrentLanguage, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguageToAdd, setSelectedLanguageToAdd] = useState('');
  const [showAddLanguage, setShowAddLanguage] = useState(false);
  const [isTranslating, setIsTranslating] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeInterface, setActiveInterface] = useState<'user' | 'client'>('user');

  const categories = ['All', ...Array.from(new Set(translations.map(t => t.category)))];

  const filteredTranslations = translations.filter(translation => {
    const matchesSearch = translation.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         translation.defaultText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || translation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get languages that haven't been added yet
  const availableLanguagesToAdd = PREDEFINED_LANGUAGES.filter(
    lang => !availableLanguages.some(existing => existing.code === lang.code)
  );

  const handleAddLanguage = () => {
    if (selectedLanguageToAdd) {
      const languageToAdd = PREDEFINED_LANGUAGES.find(lang => lang.code === selectedLanguageToAdd);
      if (languageToAdd) {
        addLanguage(languageToAdd.code, languageToAdd.name);
        setSelectedLanguageToAdd('');
        setShowAddLanguage(false);
        setHasUnsavedChanges(true);
      }
    }
  };

  const handleDeleteLanguage = (languageCode: string) => {
    if (languageCode === 'en') return; // Don't allow deleting English
    if (confirm(`Are you sure you want to delete the ${availableLanguages.find(l => l.code === languageCode)?.name} language? This will remove all translations for this language.`)) {
      deleteLanguage(languageCode);
      setHasUnsavedChanges(true);
    }
  };

  const handleTranslationChange = (key: string, languageCode: string, value: string) => {
    updateTranslation(key, languageCode, value);
    setHasUnsavedChanges(true);
  };

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    setHasUnsavedChanges(true);
  };

  const handleAutoTranslate = async (targetLanguage: string) => {
    setIsTranslating(targetLanguage);
    
    // Simulate AI translation - in a real app, this would call an AI translation service
    for (const translation of translations) {
      if (!translation.translations[targetLanguage]) {
        // Mock translation logic - you'd replace this with actual AI translation
        const mockTranslation = `[${targetLanguage.toUpperCase()}] ${translation.defaultText}`;
        updateTranslation(translation.key, targetLanguage, mockTranslation);
      }
    }
    
    setIsTranslating(null);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    // In a real app, this would save to a backend/database
    console.log('Saving language settings...');
    setHasUnsavedChanges(false);
    // Show success toast or notification
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('settings.languageSettings')}</h1>
          <p className="text-gray-600">Manage translations for all text in the CRM system</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={!hasUnsavedChanges}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Interface Selection */}
      <div className="mb-6 bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Translation Interface</h3>
        <div className="flex gap-4">
          <Button
            onClick={() => setActiveInterface('user')}
            variant={activeInterface === 'user' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            User Interface
          </Button>
          <Button
            onClick={() => setActiveInterface('client')}
            variant={activeInterface === 'client' ? 'default' : 'outline'}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            Client Interface
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {activeInterface === 'user' 
            ? 'Translate the CRM system interface used by administrators and staff'
            : 'Translate the client app interface used by customers'
          }
        </p>
      </div>

      {/* Language Selection */}
      <div className="mb-6 bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Current Language</h3>
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Active Language</label>
            <select
              value={currentLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {availableLanguages.map(language => (
                <option key={language.code} value={language.code}>{language.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder={t('general.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Add Language Button */}
          <button
            onClick={() => setShowAddLanguage(!showAddLanguage)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Language
          </button>
        </div>

        {/* Add Language Form */}
        {showAddLanguage && (
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Language</label>
                <Select value={selectedLanguageToAdd} onValueChange={setSelectedLanguageToAdd}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a language to add" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto bg-white border border-gray-200 shadow-lg z-50">
                    {availableLanguagesToAdd.map((language) => (
                      <SelectItem key={language.code} value={language.code}>
                        <div className="flex items-center justify-between w-full">
                          <span>{language.name}</span>
                          <span className="text-xs text-gray-500 ml-2">({language.code})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <button
                onClick={handleAddLanguage}
                disabled={!selectedLanguageToAdd}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:bg-gray-400"
              >
                {t('button.add')}
              </button>
              <button
                onClick={() => setShowAddLanguage(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                {t('button.cancel')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Translation Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-48">Key</TableHead>
              <TableHead className="w-32">Category</TableHead>
              <TableHead className="w-64">English (Default)</TableHead>
              {availableLanguages.filter(lang => lang.code !== 'en').map(language => (
                <TableHead key={language.code} className="w-64">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      {language.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        onClick={() => handleAutoTranslate(language.code)}
                        disabled={isTranslating === language.code}
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-1 h-8 w-8"
                        title={`Auto-translate to ${language.name}`}
                      >
                        <Wand2 className="h-3 w-3" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteLanguage(language.code)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-8 w-8"
                        title={`Delete ${language.name} language`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTranslations.map((translation) => (
              <TableRow key={translation.key}>
                <TableCell className="font-medium text-sm">{translation.key}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {translation.category}
                  </span>
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={translation.defaultText}
                    onChange={(e) => handleTranslationChange(translation.key, 'en', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </TableCell>
                {availableLanguages.filter(lang => lang.code !== 'en').map(language => (
                  <TableCell key={language.code}>
                    <input
                      type="text"
                      value={translation.translations[language.code] || ''}
                      onChange={(e) => handleTranslationChange(translation.key, language.code, e.target.value)}
                      placeholder={`Translation in ${language.name}`}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredTranslations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No translations found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default LanguageSettings;
