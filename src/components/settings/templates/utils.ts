
import { Template, TranslationStatus } from './types';
import { moduleTemplates, contractTemplates, templateTranslations } from './templateData';

export const getTemplatesByCategory = (category: string, selectedModule: string): Template[] => {
  switch (category) {
    case 'emails':
      return moduleTemplates[selectedModule] || [];
    case 'contracts':
      return contractTemplates;
    default:
      return [];
  }
};

export const getTranslationStatus = (
  templateId: string, 
  availableLanguages: { code: string; name: string }[]
): TranslationStatus => {
  const translations = templateTranslations[templateId] || {};
  const translatedLanguages = availableLanguages.filter(lang => translations[lang.code]);
  const untranslatedLanguages = availableLanguages.filter(lang => !translations[lang.code]);
  
  return {
    translatedLanguages,
    untranslatedLanguages,
    isFullyTranslated: untranslatedLanguages.length === 0
  };
};

export const getTotalUntranslatedCount = (
  templates: Template[], 
  availableLanguages: { code: string; name: string }[]
): number => {
  return templates.reduce((count, template) => {
    const status = getTranslationStatus(template.id, availableLanguages);
    return count + (status.isFullyTranslated ? 0 : 1);
  }, 0);
};

export const getFilteredTemplates = (
  templates: Template[], 
  showUntranslatedOnly: boolean,
  availableLanguages: { code: string; name: string }[]
): Template[] => {
  if (!showUntranslatedOnly) return templates;
  
  return templates.filter(template => {
    const status = getTranslationStatus(template.id, availableLanguages);
    return !status.isFullyTranslated;
  });
};

export const createDuplicateTemplate = (template: Template): Template => {
  return {
    ...template,
    id: `${template.id}_copy_${Date.now()}`,
    name: `${template.name} (Copy)`,
    isDefault: false
  };
};
