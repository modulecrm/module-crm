
import React from 'react';

interface PlaceholderModuleProps {
  title: string;
  description: string;
  variant?: 'default' | 'premium';
  premiumType?: string;
}

const PlaceholderModule: React.FC<PlaceholderModuleProps> = ({ 
  title, 
  description, 
  variant = 'default',
  premiumType 
}) => {
  const getBackgroundClass = () => {
    if (variant === 'premium') {
      if (premiumType === 'coworking') {
        return 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200';
      }
      if (premiumType === 'gym') {
        return 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200';
      }
    }
    return 'bg-blue-50 border border-blue-200';
  };

  const getTextClass = () => {
    if (variant === 'premium') {
      if (premiumType === 'coworking') return 'text-blue-800';
      if (premiumType === 'gym') return 'text-yellow-800';
    }
    return 'text-blue-800';
  };

  const getDescriptionClass = () => {
    if (variant === 'premium') {
      if (premiumType === 'coworking') return 'text-blue-700';
      if (premiumType === 'gym') return 'text-yellow-700';
    }
    return 'text-blue-800';
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <div className={`${getBackgroundClass()} rounded-lg p-6`}>
        {variant === 'premium' && (
          <p className={`${getTextClass()} mb-2`}><strong>Premium Module</strong></p>
        )}
        <p className={getDescriptionClass()}>{description}</p>
      </div>
    </div>
  );
};

export default PlaceholderModule;
