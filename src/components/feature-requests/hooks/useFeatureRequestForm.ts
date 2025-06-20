
import { useState } from 'react';

interface FormData {
  title: string;
  description: string;
  module: string;
}

export const useFeatureRequestForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    module: '',
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', module: '' });
  };

  const isFormValid = () => {
    return formData.title.trim() && formData.module;
  };

  return {
    formData,
    updateFormData,
    resetForm,
    isFormValid,
  };
};
