
export interface Template {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
}

export interface ModuleOption {
  id: string;
  name: string;
  icon: any;
  color: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  icon: any;
}

export interface TranslationStatus {
  translatedLanguages: { code: string; name: string }[];
  untranslatedLanguages: { code: string; name: string }[];
  isFullyTranslated: boolean;
}
